// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [audio, setAudio] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setAudio(e.target.files[0]);
    setTranscript('');
    setSummary('');
    setError('');
  };

  const handleUpload = async () => {
    if (!audio) {
      setError("Please select an audio file first.");
      return;
    }

    setLoading(true);
    setError('');
    const formData = new FormData();
    
    formData.append('audio', audio);

    try {
     const res = await fetch('http://localhost:5000/upload', {
  method: 'POST',
  body: formData
});

if (!res.ok) {
  const errorData = await res.text(); // try to capture the raw error
  throw new Error(`Server error: ${res.status} - ${errorData}`);
  }
  const data = await res.json();
      if(data.transcript){
        setTranscript(data.transcript);
      }
      if(data.summary){
        setSummary(data.summary);
      }
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🎙️ Audio Transcription & Summary</h1>

      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Transcribe</button>

      {loading && <p>⏳ Processing... please wait.</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      {transcript && (
        <>
          <h2>📝 Transcript</h2>
          <p>{transcript}</p>
        </>
      )}

      {summary && (
        <>
          <h2>📄 Summary</h2>
          <p>{summary}</p>
        </>
      )}
    </div>
  );
}

export default App;
