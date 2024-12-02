const axios = require('axios');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const path = require('path');
const multer = require('multer');
const libre = require('libreoffice-convert');
const fs = require('fs');
const FormData = require('form-data');  //for extracting text from PDF


//----------------------------------------------------------------------------------------

// Initialize Firebase Admin SDK
const serviceAccount = require('../firebase-service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Define the port
const PORT = process.env.PORT || 5000;


// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: "API is working at the /index.js route!" });
});

// Route to check if user exists
app.post('/checkUserExists', async (req, res) => {
    const { email } = req.body; //get the email from request body

    try {
        //returns user details to client (userRecord and exists state)
        const userRecord = await admin.auth().getUserByEmail(email); //check, using firebase auth API
        res.status(200).json({ exists: true, userRecord });
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            res.status(200).json({ exists: false });
        } else {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Error checking user existence' });
        }
    }
});



//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//multer setup for the LLMs
// Configure Multer with the 'dest' option, temporarily store in 'pdf-uploads'
const pdfUpload = multer({ dest: 'pdf-uploads/' }); // Automatically save with random filenames
//-------------------------------------------------------------------------------------------------------
// Summarization
app.post('/summarize-pdf', pdfUpload.single('file'), async (req, res) => {
    // Step 1: Validate if the file was uploaded successfully
    if (!req.file || !req.file.path) {
        console.error("File upload failed or file path is missing.");
        return res.status(400).json({ error: 'No file uploaded or invalid file path.' });
    }

    const filePath = req.file.path; //file saved to disk using file path
    // convert file into a read stream using node.js's function
    const readStream = fs.createReadStream(filePath); //to be read in chunks (binary data), prevent RAM overload especially for large pdf

    try {
        // Prepare attaching the readstream to a FormData object
        const formData = new FormData();
        formData.append('file', readStream); //for HTTP transmission, format 'multipart/form-data' is required

        //process output (in text) in JSON
        const pythonResponse = await axios.post('http://localhost:5001/extract-text', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        const pdfText = pythonResponse.data.text; //put the response into this pdfText 
        // Log the extracted text to the console
        console.log("Extracted PDF Content (to be sent to GPT):\n", pdfText);



        // Call GPT model with extracted text, pdfText
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo-0125',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that summarizes documents. Avoid using symbols like #, *, ** or any Markdown-style formatting in the output.' },
                    { role: 'user', content: `Provide a summary and table of contents for the following PDF content:\n\n${pdfText}.` },
                ],
                //max_tokens: 500,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        // Extract the assistant's response text (choices[0].message.content),
        const summary = openaiResponse.data.choices[0].message.content;
        res.status(200).json({ summary });
    } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).json({ error: 'Failed to generate summary.' });
    } finally {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting the file:", err);
            } else {
                console.log("File successfully deleted.");
            }
        });
    }
});
//-------------------------------------------------------------------------------------------------------
//next key concept

// Route to handle PDF key concepts extraction
app.post('/extract-key-concepts', pdfUpload.single('file'), async (req, res) => {
    if (!req.file || !req.file.path) {
        console.error("File upload failed or file path is missing.");
        return res.status(400).json({ error: 'No file uploaded or invalid file path.' });
    }

    const filePath = req.file.path; // in disk
    const readStream = fs.createReadStream(filePath); //in readstream in chunks

    try {
        // Prepare FormData for HTTP transmission
        const formData = new FormData();
        formData.append('file', readStream);

        const pythonResponse = await axios.post('http://localhost:5001/extract-text', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        const pdfText = pythonResponse.data.text;

        console.log("Extracted PDF Content (to be analyzed for key concepts):\n", pdfText);

        // Call GPT model for key concepts extraction
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that extracts key concepts from documents. Avoid using symbols like #, *, **, or any Markdown-style formatting in the output.' },
                    { role: 'user', content: `Identify and explain the key concepts in the following PDF content:\n\n${pdfText}.` },
                ],
                //max_tokens: 500, //about 400 words
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const keyConcepts = openaiResponse.data.choices[0].message.content;
        res.status(200).json({ keyConcepts });
    } catch (error) {
        console.error("Error processing PDF for key concepts:", error);
        res.status(500).json({ error: 'Failed to extract key concepts.' });
    } finally {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting the file:", err);
            } else {
                console.log("File successfully deleted.");
            }
        });
    }
});
//-----------------------------------------------------------------------------------------------
//next, contextual q&a

// Route to handle contextual Q&A
app.post('/contextual-qa', pdfUpload.single('file'), async (req, res) => {
    if (!req.file || !req.file.path) {
        console.error("File upload failed or file path is missing.");
        return res.status(400).json({ error: 'No file uploaded or invalid file path.' });
    }

    const filePath = req.file.path;
    const readStream = fs.createReadStream(filePath);

    const userPrompt = req.body.prompt; // Get the user prompt from the request

    try {
        // Prepare FormData
        const formData = new FormData();
        formData.append('file', readStream);

        const pythonResponse = await axios.post('http://localhost:5001/extract-text', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        const pdfText = pythonResponse.data.text;

        console.log("Extracted PDF Content (for contextual Q&A):\n", pdfText);

        // Call GPT model for contextual Q&A
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an assistant who provides answers strictly based on the PDF document only. If the question does not relate to the content, clarify that you can only respond to questions relevant to the document. Avoid using symbols like #, *, **, or any Markdown-style formatting in the output.' },
                    { role: 'user', content: `${userPrompt}\n\nPDF Content:\n${pdfText}` },
                ],
                //max_tokens: 700, //520-560 words
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const answer = openaiResponse.data.choices[0].message.content;
        res.status(200).json({ answer });
    } catch (error) {
        console.error("Error processing PDF for contextual Q&A:", error);
        res.status(500).json({ error: 'Failed to generate answer.' });
    } finally {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting the file:", err);
            } else {
                console.log("File successfully deleted.");
            }
        });
    }
});
//----------------------------------------------------------------------------------------------

//adding the generate flashcards now!
app.post('/generate-flashcards', pdfUpload.single('file'), async (req, res) => {
    console.log("successfully called the api");

    if (!req.file || !req.file.path) {
        console.error("File upload failed or file path is missing.");
        return res.status(400).json({ error: 'No file uploaded or invalid file path.' });
    }

    const filePath = req.file.path;
    const readStream = fs.createReadStream(filePath);

    try {
        const formData = new FormData();
        formData.append('file', readStream);

        // Extract text from the PDF
        const pythonResponse = await axios.post('http://localhost:5001/extract-text', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const pdfText = pythonResponse.data.text;

        // Log the extracted text to the console
        console.log("Extracted PDF Content (to GPT for flashcard):\n", pdfText);

        // Send the extracted text to GPT to generate flashcards
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an assistant that creates flashcards from text.' },
                    {
                        role: 'user',
                        content: `Create 5 flashcards from the following text. Each flashcard should have a "question" and an "answer". 
                         Do not improvise or rephrase the original content—use exact words from the provided text wherever possible. 
                         You can omit unnecessary words for conciseness but do not add new information or paraphrase. 
                         The flashcards must be accurate and should capture the key information as closely as possible to the original text. 
                         Output the flashcards as a valid JSON array with this structure:
                          [{ "question": "Your question here", "answer": "Your answer here" }]. Here is the text: "${pdfText}"`
                    }
                ],
                //max_tokens: 1000,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Log the response from GPT-3.5
        console.log("GPT-3.5 API response:", openaiResponse.data);

        const flashcardData = openaiResponse.data.choices[0].message.content;

        // Log the extracted flashcards
        //console.log("Extracted flashcards data:", flashcardData);

        res.status(200).json({ flashcards: flashcardData });
    } catch (error) {
        console.error("Error generating flashcards:", error);
        res.status(500).json({ error: 'Failed to generate flashcards.' });
    } finally {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting the file:", err);
            } else {
                console.log("File successfully deleted.");
            }
        });
    }
});


//----------------------------------------------------------------------
//evaluate answer with gpt model
app.post('/evaluate-answer', async (req, res) => {
    const { promptText } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: promptText }
                ],
                //max_tokens: 150
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const evaluation = response.data.choices[0].message.content;
        res.status(200).json({ evaluation });
    } catch (error) {
        console.error("Error evaluating the answer:", error);
        res.status(500).json({ error: "Failed to evaluate the answer." });
    }
});

//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//multer setup for file uploads (making document note), using 'dest'
const upload = multer({ dest: 'uploads/' });// multer saves the file to "uploads/"

// Route to handle file conversion from DOCX/PPTX to PDF-------------------------------------------------
app.post('/convert-to-pdf', upload.single('file'), async (req, res) => {

    const file = req.file; //the uploaded file (still a file)
    console.log("File uploaded:", file);
    
    //ensure file is uploaded
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    // validate again the file type in backend
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (fileExtension !== '.docx' && fileExtension !== '.pptx') {
        return res.status(400).json({ error: 'Unsupported file type. Only DOCX and PPTX are allowed.' });
    }

    // set path, using absolute path resolution to avoid any path issues caused by relying on the current working directory
    const inputPath = path.resolve(file.path); // Correct the path to be absolute
    //Creates an absolute path for the output file with a .pdf extension
    const outputPath = path.resolve(path.dirname(inputPath), `${path.basename(inputPath, fileExtension)}.pdf`);

    console.log("Normalized Input Path:", inputPath);
    console.log("Normalized Output Path:", outputPath);

    // Check if file exists
    if (!fs.existsSync(inputPath)) {
        console.error('File does not exist at the specified path:', inputPath);
        return res.status(500).json({ error: 'Uploaded file not found.' });
    }

    // Convert file (read into a buffer in RAM ) to PDF
    fs.readFile(inputPath, (err, buffer) => {  //reads from the file in disk into buffer variable in RAM to manipulate it
        
        if (err) {
            console.error('Error reading uploaded file:', err);
            return res.status(500).json({ error: 'Failed to read the uploaded file.' });
        }

        console.log("File read successfully, starting conversion...");
        //LibreOffice gets the raw data and 
        libre.convert(buffer, '.pdf', undefined, (err, done) => {
            if (err) {
                console.error(`Error converting file: ${err}`);
                return res.status(500).json({ error: 'Failed to convert file to PDF.' });
            }

            console.log("File converted successfully, saving to output path...");
            // Write the converted PDF file to outputPath, in disk as file state
            fs.writeFile(outputPath, done, (err) => {
                if (err) {
                    console.error('Error writing PDF file:', err);
                    return res.status(500).json({ error: 'Failed to write the PDF file.' });
                }

                // Send the converted PDF file back to client as a response (in blob)
                res.sendFile(outputPath, (err) => { 
                    if (err) {
                        console.error('Error sending PDF file:', err);
                        return res.status(500).json({ error: 'Failed to send the PDF file.' });
                    }

                    console.log("PDF sent successfully, cleaning up...");
                    // Clean up temporary files
                    try {
                        fs.unlinkSync(inputPath); // Delete the original uploaded file
                        fs.unlinkSync(outputPath); // Delete the converted PDF file
                        console.log('Temporary files cleaned up successfully.');
                    } catch (unlinkErr) {
                        console.error('Error during cleanup:', unlinkErr);
                    }
                });
            });
        });
    });
});
//------------------------------------------------------------------------------
//----------------------------------------------------------------------------
// LLM : explain code
app.post('/explain-code', async (req, res) => {
    const { code } = req.body;
    console.log("Code received for explanation:\n", code);
    const apiKey = process.env.OPENAI_API_KEY;
    console.log(apiKey);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo-0125',
                messages: [
                    { role: 'system', content: 'You are an assistant that explains code, and your task is to explain it concisely, like a summary in paragraph and followed by points forms (use dash and remember to "enter space") about teh functions in the code file' },
                    { role: 'user', content: `Explain the following code:\n\n${code}` }
                ],
                //max_tokens: 10
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Log the full raw response to the console
        console.log("Raw OpenAI API Response:\n", JSON.stringify(response.data, null, 2));
        console.log(apiKey);
        //better than only response.data, as this  approach is less explicit and can introduce confusion or errors if the response structure changes 
        const explanation = response.data.choices[0].message.content;
        res.status(200).json({ explanation });
    } catch (error) {
        console.error("Error explaining the code:", error);
        res.status(500).json({ error: "Failed to explain the code." });
    }
});
//-----------------------------------------------------------------------------------------------

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
