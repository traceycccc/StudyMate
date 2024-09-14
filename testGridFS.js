const { MongoClient, GridFSBucket } = require('mongodb');
const path = require('path');
const fs = require('fs');

const uri = process.env.DB_URI; // Ensure this environment variable is set

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    const db = client.db('StudyMate'); // Replace with your database name
    const bucket = new GridFSBucket(db, { bucketName: 'documents' });

    // Create a readable stream from a file
    const fileStream = fs.createReadStream(path.join(__dirname, 'test-file.txt'));

    // Create an upload stream to GridFS
    const uploadStream = bucket.openUploadStream('test-file.txt');

    // Pipe the file stream to the upload stream
    fileStream.pipe(uploadStream);

    uploadStream.on('finish', () => {
        console.log('File uploaded successfully');
        client.close();
    });

    uploadStream.on('error', (err) => {
        console.error('Error uploading file:', err);
        client.close();
    });
});
