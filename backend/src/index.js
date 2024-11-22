
//tidy up for that
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

// Set up multer for file uploads (making document note)
const upload = multer({ dest: 'uploads/' });

//define a new multer instance specifically for the LLM document assistance with a custom directory
const pdfUploadsDir = path.join(__dirname, 'pdf-uploads');
// Check if the directory exists, and create it if it doesn't
if (!fs.existsSync(pdfUploadsDir)) {
    fs.mkdirSync(pdfUploadsDir, { recursive: true });
}

// Configure multer to store files in the 'pdf-uploads' directory
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pdfUploadsDir); // Save files to the 'pdf-uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

// Create an instance of multer using the new storage configuration
const pdfUpload = multer({ storage: pdfStorage });
//-------------------------------------------

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
app.post('/api/checkUserExists', async (req, res) => {
    const { email } = req.body;

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
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

//-------------------------------------------------------------------------------------------------------
// Route to handle PDF text extraction
app.post('/summarize-pdf', pdfUpload.single('file'), async (req, res) => {
    if (!req.file || !req.file.path) {
        console.error("File upload failed or file path is missing.");
        return res.status(400).json({ error: 'No file uploaded or invalid file path.' });
    }

    const filePath = req.file.path;
    const readStream = fs.createReadStream(filePath); // Open a read stream

    try {
        // Prepare FormData
        const formData = new FormData();
        formData.append('file', readStream); // Attach the file

        const pythonResponse = await axios.post('http://localhost:5001/extract-text', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        const pdfText = pythonResponse.data.text;

        // Log the extracted text to the console
        console.log("Extracted PDF Content (to be sent to GPT):\n", pdfText);



        // Call GPT model with extracted text (as in your original code)
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that summarizes documents.' },
                    { role: 'user', content: `Provide a summary and table of contents for the following PDF content:\n\n${pdfText}` },
                ],
                max_tokens: 500,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const summary = openaiResponse.data.choices[0].message.content;
        res.status(200).json({ summary });
    } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).json({ error: 'Failed to generate summary.' });
    } finally {
        // fs.unlinkSync(filePath); // Clean up uploaded file
        // Use fs.unlink instead of fs.unlinkSync for better handling of async file removal
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

    const filePath = req.file.path;
    const readStream = fs.createReadStream(filePath);

    try {
        // Prepare FormData
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
                    { role: 'system', content: 'You are a helpful assistant that extracts key concepts from documents.' },
                    { role: 'user', content: `Identify and explain the key concepts in the following PDF content:\n\n${pdfText}` },
                ],
                max_tokens: 500,
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
                    { role: 'system', content: 'You are an assistant who provides answers strictly based on the PDF document only. If the question does not relate to the content, clarify that you can only respond to questions relevant to the document.' },
                    { role: 'user', content: `${userPrompt}\n\nPDF Content:\n${pdfText}` },
                ],
                max_tokens: 500,
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
                max_tokens: 1000,
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
//evaluate answer with gpy model
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
                max_tokens: 150
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


// Route to handle file conversion from DOCX/PPTX to PDF
app.post('/convert-to-pdf', upload.single('file'), async (req, res) => {
    const file = req.file;
    console.log("File uploaded:", file);

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (fileExtension !== '.docx' && fileExtension !== '.pptx') {
        return res.status(400).json({ error: 'Unsupported file type. Only DOCX and PPTX are allowed.' });
    }

    // Use absolute path resolution to avoid any path issues
    const inputPath = path.resolve(file.path); // Correct the path to be absolute
    const outputPath = path.resolve(path.dirname(inputPath), `${path.basename(inputPath, fileExtension)}.pdf`);

    console.log("Normalized Input Path:", inputPath);
    console.log("Normalized Output Path:", outputPath);

    // Check if file exists
    if (!fs.existsSync(inputPath)) {
        console.error('File does not exist at the specified path:', inputPath);
        return res.status(500).json({ error: 'Uploaded file not found.' });
    }

    // Convert file to PDF
    fs.readFile(inputPath, (err, data) => {
        if (err) {
            console.error('Error reading uploaded file:', err);
            return res.status(500).json({ error: 'Failed to read the uploaded file.' });
        }

        console.log("File read successfully, starting conversion...");
        libre.convert(data, '.pdf', undefined, (err, done) => {
            if (err) {
                console.error(`Error converting file: ${err}`);
                return res.status(500).json({ error: 'Failed to convert file to PDF.' });
            }

            console.log("File converted successfully, saving to output path...");
            // Write the converted PDF file to outputPath
            fs.writeFile(outputPath, done, (err) => {
                if (err) {
                    console.error('Error writing PDF file:', err);
                    return res.status(500).json({ error: 'Failed to write the PDF file.' });
                }

                // Send the converted PDF file back as a response
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
//-
//after splitting the pages
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
                max_tokens: 1000
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const explanation = response.data.choices[0].message.content;
        res.status(200).json({ explanation });
    } catch (error) {
        console.error("Error explaining the code:", error);
        res.status(500).json({ error: "Failed to explain the code." });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
