
// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');
// const dotenv = require('dotenv');
// // Initialize Firebase Admin SDK
// const serviceAccount = require('../firebase-service-account.json');


// dotenv.config(); // Load environment variables from .env file

// // Initialize Express app
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Add this line below app.use(cors()) in src/index.js
// const apiRoutes = require('./routes');
// app.use(apiRoutes);



// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore(); // setting up firestore

// // Basic route to check if server is working
// app.get('/', (req, res) => {
//     res.send('Backend is running!');
// });

// // Define the port
// const PORT = process.env.PORT || 5000;




// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });






//// adding stuff here now,starting with CodeNote.js
// const axios = require('axios');

// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');
// const dotenv = require('dotenv');
// // Initialize Firebase Admin SDK
// const serviceAccount = require('../firebase-service-account.json');


// dotenv.config(); // Load environment variables from .env file

// // Initialize Express app
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Add this line below app.use(cors()) in src/index.js
// const apiRoutes = require('./routes');
// app.use(apiRoutes);



// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });


// // Basic route to check if server is working
// app.get('/', (req, res) => {
//     res.send('Backend is running!');
// });

// // Define the port
// const PORT = process.env.PORT || 5000;


// //after splitting the pages
// app.post('/explain-code', async (req, res) => {
//     const { code } = req.body;
//     console.log("Code received for explanation:\n", code);
//     const apiKey = process.env.OPENAI_API_KEY;
//     console.log(apiKey);

//     try {
//         const response = await axios.post(
//             'https://api.openai.com/v1/chat/completions',
//             {
//                 model: 'gpt-3.5-turbo-0125',
//                 messages: [
//                     { role: 'system', content: 'You are an assistant that explains code, and your task is to explain it concisely' },
//                     { role: 'user', content: `Explain the following code:\n\n${code}` }
//                 ],
//                 max_tokens: 1000
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${apiKey}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         const explanation = response.data.choices[0].message.content;
//         res.status(200).json({ explanation });
//     } catch (error) {
//         console.error("Error explaining the code:", error);
//         res.status(500).json({ error: "Failed to explain the code." });
//     }
// });


// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });





// ////document + note now:, DocuNote.js
// //attempting to fixxxx
// const axios = require('axios');

// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');
// const dotenv = require('dotenv');

// const path = require('path');
// const multer = require('multer');
// const libre = require('libreoffice-convert');
// const fs = require('fs');

// // Set up multer for file uploads
// const upload = multer({ dest: 'uploads/' });


// // Initialize Firebase Admin SDK
// const serviceAccount = require('../firebase-service-account.json');


// dotenv.config(); // Load environment variables from .env file

// // Initialize Express app
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Define the port
// const PORT = process.env.PORT || 5000;

// // Add this line below app.use(cors()) in src/index.js
// const apiRoutes = require('./routes');
// app.use(apiRoutes);



// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });





// // Basic route to check if server is working
// app.get('/', (req, res) => {
//     res.send('Backend is running!');
// });



// // // Route to handle file conversion from DOCX/PPTX to PDF
// // app.post('/convert-to-pdf', upload.single('file'), async (req, res) => {
// //     const file = req.file;
// //     console.log("File uploaded:", file);

// //     if (!file) {
// //         return res.status(400).json({ error: 'No file uploaded.' });
// //     }

// //     const fileExtension = path.extname(file.originalname).toLowerCase();
// //     if (fileExtension !== '.docx' && fileExtension !== '.pptx') {
// //         return res.status(400).json({ error: 'Unsupported file type. Only DOCX and PPTX are allowed.' });
// //     }

// //     // const inputPath = path.join(__dirname, file.path);
// //     // const outputPath = `${inputPath}.pdf`;
// //     // const inputPath = path.normalize(path.join(__dirname, file.path));
// //     // const outputPath = path.normalize(`${inputPath}.pdf`);

// //     // Normalize paths using path.resolve()
// //     const inputPath = path.resolve(__dirname, '..', file.path);
// //     const outputPath = path.resolve(`${inputPath}.pdf`);

// //     // console.log("Input Path:", inputPath);
// //     // console.log("Output Path:", outputPath);

// //     console.log("Normalized Input Path:", inputPath);
// //     console.log("Normalized Output Path:", outputPath);

// //     // Check if file exists
// //     if (!fs.existsSync(inputPath)) {
// //         console.error('File does not exist at the specified path:', inputPath);
// //         return res.status(500).json({ error: 'Uploaded file not found.' });
// //     }


// //     // Convert file to PDF
// //     fs.readFile(inputPath, (err, data) => {
// //         if (err) {
// //             console.error('Error reading uploaded file:', err);
// //             return res.status(500).json({ error: 'Failed to read the uploaded file.' });
// //         }

// //         console.log("File read successfully, starting conversion...");
// //         libre.convert(data, '.pdf', undefined, (err, done) => {
// //             if (err) {
// //                 console.error(`Error converting file: ${err}`);
// //                 return res.status(500).json({ error: 'Failed to convert file to PDF.' });
// //             }

// //             console.log("File converted successfully, saving to output path...");
// //             // Write the converted PDF file to outputPath
// //             fs.writeFile(outputPath, done, (err) => {
// //                 if (err) {
// //                     console.error('Error writing PDF file:', err);
// //                     return res.status(500).json({ error: 'Failed to write the PDF file.' });
// //                 }

// //                 // Send the converted PDF file back as a response
// //                 res.sendFile(outputPath, (err) => {
// //                     if (err) {
// //                         console.error('Error sending PDF file:', err);
// //                         return res.status(500).json({ error: 'Failed to send the PDF file.' });
// //                     }

// //                     console.log("PDF sent successfully, cleaning up...");
// //                     // Clean up temporary files
// //                     try {
// //                         fs.unlinkSync(inputPath); // Delete the original uploaded file
// //                         fs.unlinkSync(outputPath); // Delete the converted PDF file
// //                         console.log('Temporary files cleaned up successfully.');
// //                     } catch (unlinkErr) {
// //                         console.error('Error during cleanup:', unlinkErr);
// //                     }
// //                 });
// //             });
// //         });
// //     });
// // });


// //suddenly cannot work?? fixed
// // Route to handle file conversion from DOCX/PPTX to PDF
// app.post('/convert-to-pdf', upload.single('file'), async (req, res) => {
//     const file = req.file;
//     console.log("File uploaded:", file);

//     if (!file) {
//         return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const fileExtension = path.extname(file.originalname).toLowerCase();
//     if (fileExtension !== '.docx' && fileExtension !== '.pptx') {
//         return res.status(400).json({ error: 'Unsupported file type. Only DOCX and PPTX are allowed.' });
//     }

//     // Use absolute path resolution to avoid any path issues
//     const inputPath = path.resolve(file.path); // Correct the path to be absolute
//     const outputPath = path.resolve(path.dirname(inputPath), `${path.basename(inputPath, fileExtension)}.pdf`);

//     console.log("Normalized Input Path:", inputPath);
//     console.log("Normalized Output Path:", outputPath);

//     // Check if file exists
//     if (!fs.existsSync(inputPath)) {
//         console.error('File does not exist at the specified path:', inputPath);
//         return res.status(500).json({ error: 'Uploaded file not found.' });
//     }

//     // Convert file to PDF
//     fs.readFile(inputPath, (err, data) => {
//         if (err) {
//             console.error('Error reading uploaded file:', err);
//             return res.status(500).json({ error: 'Failed to read the uploaded file.' });
//         }

//         console.log("File read successfully, starting conversion...");
//         libre.convert(data, '.pdf', undefined, (err, done) => {
//             if (err) {
//                 console.error(`Error converting file: ${err}`);
//                 return res.status(500).json({ error: 'Failed to convert file to PDF.' });
//             }

//             console.log("File converted successfully, saving to output path...");
//             // Write the converted PDF file to outputPath
//             fs.writeFile(outputPath, done, (err) => {
//                 if (err) {
//                     console.error('Error writing PDF file:', err);
//                     return res.status(500).json({ error: 'Failed to write the PDF file.' });
//                 }

//                 // Send the converted PDF file back as a response
//                 res.sendFile(outputPath, (err) => {
//                     if (err) {
//                         console.error('Error sending PDF file:', err);
//                         return res.status(500).json({ error: 'Failed to send the PDF file.' });
//                     }

//                     console.log("PDF sent successfully, cleaning up...");
//                     // Clean up temporary files
//                     try {
//                         fs.unlinkSync(inputPath); // Delete the original uploaded file
//                         fs.unlinkSync(outputPath); // Delete the converted PDF file
//                         console.log('Temporary files cleaned up successfully.');
//                     } catch (unlinkErr) {
//                         console.error('Error during cleanup:', unlinkErr);
//                     }
//                 });
//             });
//         });
//     });
// });



// //after splitting the pages
// app.post('/explain-code', async (req, res) => {
//     const { code } = req.body;
//     console.log("Code received for explanation:\n", code);
//     const apiKey = process.env.OPENAI_API_KEY;
//     console.log(apiKey);

//     try {
//         const response = await axios.post(
//             'https://api.openai.com/v1/chat/completions',
//             {
//                 model: 'gpt-3.5-turbo-0125',
//                 messages: [
//                     { role: 'system', content: 'You are an assistant that explains code, and your task is to explain it concisely' },
//                     { role: 'user', content: `Explain the following code:\n\n${code}` }
//                 ],
//                 max_tokens: 1000
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${apiKey}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         const explanation = response.data.choices[0].message.content;
//         res.status(200).json({ explanation });
//     } catch (error) {
//         console.error("Error explaining the code:", error);
//         res.status(500).json({ error: "Failed to explain the code." });
//     }
// });


// // // Route to handle PDF text extraction and summarization
// // app.post('/summarize-pdf', upload.single('file'), async (req, res) => {
// //     if (!req.file || !req.file.path) {
// //         console.error("File upload failed or file path is missing.");
// //         return res.status(400).json({ error: 'No file uploaded or invalid file path.' });
// //     }

// //     const filePath = req.file.path;

// //     try {
// //         // Prepare FormData
// //         const formData = new FormData();
// //         formData.append('file', fs.createReadStream(filePath)); // Attach the file

// //         const pythonResponse = await axios.post('http://localhost:5001/extract-text', { file: fs.createReadStream(filePath) }, {
// //             headers: { 'Content-Type': 'multipart/form-data' }
// //         });

// //         const pdfText = pythonResponse.data.text;

// //         // Log the extracted text to the console
// //         console.log("Extracted PDF Content (to be sent to GPT):\n", pdfText);

// //         // Call GPT model with extracted text
// //         const openaiResponse = await axios.post(
// //             'https://api.openai.com/v1/chat/completions',
// //             {
// //                 model: 'gpt-3.5-turbo',
// //                 messages: [
// //                     { role: 'system', content: 'You are a helpful assistant that summarizes documents.' },
// //                     { role: 'user', content: `Provide a summary and table of contents for the following PDF content:\n\n${pdfText}` },
// //                 ],
// //                 max_tokens: 500,
// //             },
// //             {
// //                 headers: {
// //                     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
// //                     'Content-Type': 'application/json',
// //                 },
// //             }
// //         );

// //         const summary = openaiResponse.data.choices[0].message.content;
// //         res.status(200).json({ summary });
// //     } catch (error) {
// //         console.error("Error processing PDF:", error);
// //         res.status(500).json({ error: 'Failed to generate summary.' });
// //     } finally {
// //         fs.unlinkSync(filePath); // Clean up uploaded file
// //     }
// // });


// // // Route to handle PDF text extraction
// // app.post('/summarize-pdf', upload.single('file'), async (req, res) => {
// //     if (!req.file || !req.file.path) {
// //         console.error("File upload failed or file path is missing.");
// //         return res.status(400).json({ error: 'No file uploaded or invalid file path.' });
// //     }

// //     console.log('File received:', req.file); // Log the received file

// //     const filePath = req.file.path;

// //     try {
// //         // Prepare FormData
// //         const formData = new FormData();
// //         formData.append('file', fs.createReadStream(filePath)); // Attach the file

// //         const pythonResponse = await axios.post('http://localhost:5001/extract-text', formData, {
// //             headers: { 'Content-Type': 'multipart/form-data' }
// //         });

// //         console.log("Python API Response:", pythonResponse.data); // Log response from Python server

// //         const pdfText = pythonResponse.data.text;

// //         // Log the extracted text to the console
// //         console.log("Extracted PDF Content (to be sent to GPT):\n", pdfText);

// //         const apiKey = process.env.OPENAI_API_KEY;



// //         // Call GPT model with extracted text (as in your original code)
// //         const openaiResponse = await axios.post(
// //             'https://api.openai.com/v1/chat/completions',
// //             {
// //                 model: 'gpt-3.5-turbo',
// //                 messages: [
// //                     { role: 'system', content: 'You are a helpful assistant that summarizes documents.' },
// //                     { role: 'user', content: `Provide a summary and table of contents for the following PDF content:\n\n${pdfText}` },
// //                 ],
// //                 max_tokens: 500,
// //             },
// //             {
// //                 headers: {
// //                     Authorization: `Bearer ${apiKey}`,
// //                     'Content-Type': 'application/json',
// //                 },
// //             }
// //         );

// //         const summary = openaiResponse.data.choices[0].message.content;
// //         console.log("summary: ", summary);
// //         res.status(200).json({ summary });
// //     } catch (error) {
// //         console.error("Error processing PDF:", error);
// //         res.status(500).json({ error: 'Failed to generate summary.' });
// //     } finally {
// //         fs.unlinkSync(filePath); // Clean up uploaded file
// //     }
// // });



// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });











///trying on the different directory see
////document + note now:, DocuNote.js
//attempting to fixxxx
const axios = require('axios');

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY); // For debugging purposes, remove after verification

const path = require('path');
const multer = require('multer');
const libre = require('libreoffice-convert');
const fs = require('fs');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

//--------------------------------------------
//summaries which python extract
const FormData = require('form-data');
//define a new multer instance specifically for the /summarize-pdf ute with a custom directory
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




// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Define the port
const PORT = process.env.PORT || 5000;

// Add this line below app.use(cors()) in src/index.js
const apiRoutes = require('./routes');
app.use(apiRoutes);



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});





// Basic route to check if server is working
app.get('/', (req, res) => {
    res.send('Backend is running!');
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
//suddenly cannot work?? fixed
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
