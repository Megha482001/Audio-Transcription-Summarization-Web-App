const axios = require('axios');
const fs = require('fs');
const path = require('path');

//  Gemini SDK
const { GoogleGenAI } = require('@google/genai');

//  Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Transcription with AssemblyAI
async function transcribeAudio(filePath) {
  const audio = fs.readFileSync(filePath);

  const uploadRes = await axios.post('https://api.assemblyai.com/v2/upload', audio, {
    headers: {
      authorization: process.env.ASSEMBLYAI_API_KEY,
      'content-type': 'application/octet-stream',
    },
  });

  const transcriptRes = await axios.post(
    'https://api.assemblyai.com/v2/transcript',
    {
      audio_url: uploadRes.data.upload_url,
    },
    {
      headers: { authorization: process.env.ASSEMBLYAI_API_KEY },
    }
  );

  const transcriptId = transcriptRes.data.id;
  let pollingRes;

  while (true) {
    pollingRes = await axios.get(
      `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
      {
        headers: { authorization: process.env.ASSEMBLYAI_API_KEY },
      }
    );

    if (pollingRes.data.status === 'completed') break;
    if (pollingRes.data.status === 'error') throw new Error('Transcription failed');
    await new Promise((r) => setTimeout(r, 3000));
  }

  return pollingRes.data.text;
}

// Generate Summary with Gemini 
async function generateSummary(text) {
  const contents=`summarize the following text. ${text}`
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
  });
  console.log(response.text);

  return response.text;
}

module.exports = { transcribeAudio, generateSummary };
