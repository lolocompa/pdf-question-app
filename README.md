# PDF Question App

This application allow the user to upload their pdf files and ask question tha will be answered using an AI.

## Features

- upload pdf: users can upload their pdf files
- ask questions: once the file is uploaded the user can ask questions regarding it's content
- speech recognition: allow users to use speech recognition
- AI generative answers: uses langchain technology to generate a response based on the file uploaded and the question asked

## TECHNOLOGY USED

- Frontend: React.js, CSS
- Backend: FastAPI
- Database: SQLite3
- AI: langchain, OpenAI

## INSTALLATION

- Clone the repository: https://github.com/lolocompa/pdf-question-app.git
- Navigate to the project directory: cd pdf-question-app
- Navigate to the frontend: cd frontend, cd pdf-question-app
- install frontend dependencies: npm install
- navigate to the backend: cd backend
- istall backend dependencies: pip install -r requirements.txt
- run frontend: npm start
- run backend: uvicorn main:app --reload
