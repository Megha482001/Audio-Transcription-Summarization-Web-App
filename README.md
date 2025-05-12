# Audio Transcription and Summarization Web App

This web application enables users to upload audio files, transcribe the spoken content into text, and generate concise summaries of the transcriptions. It comprises two main components:

- **Backend**: Handles audio processing, transcription, and summarization.
- **Frontend**: Provides a user-friendly interface for uploading audio files and viewing results.

## Features

- Upload audio files in various formats.
- Transcribe audio to text using advanced speech recognition.
- Generate summaries of transcribed text using natural language processing.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Megha482001/Audio-Transcription-Summarization-Web-App.git
cd Audio-Transcription-Summarization-Web-App
```
##  Backend Setup
```bash
cd backend
npm install
npm run start
```
This will start the backend server, which listens for incoming requests to process audio files.

##  Frontend Setup
```bash
cd frontend
add the envs with the api keys 
npm install
npm run start
```

This will launch the frontend application in your default web browser, typically at http://localhost:3000

## High-Level Architecture

### Backend

- **Audio Upload**: Receives audio files from the frontend via HTTP requests.
- **Transcription**: Utilizes a assemblyAi speech recognition library to convert audio into text.
- **Summarization**: Applies google gemini as GenAi tool to summarize the transcribed text.
- **API Endpoints**: Exposes endpoints for the frontend to interact with, such as uploading files and retrieving results.

### Frontend

- **User Interface**: Built with React, providing components for file upload and displaying results.
- **API Integration**: Sends audio files to the backend and receives transcription and summary data.
- **State Management**: Manages application state to reflect processing status and display results dynamically.
