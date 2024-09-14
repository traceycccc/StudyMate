// routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage; // Adjust import for the correct usage
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const router = express.Router();


// MongoDB connection
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  // Initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('documents');
  console.log('GridFS Initialized');
});

// // Create storage engine
// const storage = new multerGridfsStorage({
//   url: process.env.DB_URI,
//   file: (req, file) => ({
//     bucketName: 'documents',
//     filename: `${Date.now()}-${file.originalname}`
//   })
// });

// Create a storage engine
const storage = new GridFsStorage({
  url: process.env.DB_URI, // MongoDB connection URI
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          console.error('Error generating random bytes:', err);
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'documents', // The name of the bucket
          // metadata: {
          //   //userId: req.user?._id // Example: attach user ID to metadata
          //   //userId: '9IPz01h9JGTHfkSPHsR1LBOr2793'
          // }
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// @route POST /api/files/upload
// @desc Uploads file to GridFS
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  res.json({ file: req.file });
});

// @route GET /api/files/:filename
// @desc Download file from GridFS
router.get('/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

module.exports = router;
