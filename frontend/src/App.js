import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
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
      setError('Please select an audio file first.');
      return;
    }

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('audio', audio);

    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorData}`);
      }

      const data = await res.json();
      if (data.transcript) setTranscript(data.transcript);
      if (data.summary) setSummary(data.summary);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        🎙️ Audio Transcription & Summary
      </Typography>

      <input type="file" accept="audio/*" onChange={handleFileChange} />

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Upload & Transcribe'}
      </Button>

      {loading && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <CircularProgress color="primary" />
        </div>
      )}

      {error && (
        <Alert severity="error" style={{ marginTop: '1rem' }}>
          {error}
        </Alert>
      )}

      {audio && (
        <div style={{ marginTop: '1.5rem' }}>
          <Typography variant="h6" gutterBottom>
            🔊 Audio Preview
          </Typography>
          <audio controls src={URL.createObjectURL(audio)} style={{ width: '100%' }} />
        </div>
      )}

      {transcript && (
        <div className="typography-section">
          <Typography variant="h6" gutterBottom>
            📝 Transcript
          </Typography>
          <Typography>{transcript}</Typography>
        </div>
      )}

      {summary && (
        <div className="typography-section">
          <Typography variant="h6" gutterBottom>
            📄 Summary
          </Typography>
          <Typography>{summary}</Typography>
        </div>
      )}
    </Container>
  );
}

export default App;
