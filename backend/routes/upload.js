const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { transcribeAudio, generateSummary } = require('../utils/transcribe');
const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

//  Route to handle upload
router.post('/', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    const transcript = await transcribeAudio(filePath);
    console.log('Transcript:', transcript);

    const summary = await generateSummary(transcript);
    console.log('Summary:', summary);

    fs.unlinkSync(filePath); // Clean up

    res.json({ transcript, summary });
  } catch (err) {
    console.error(' Multer or other error:', err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
