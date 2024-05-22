from fastapi import APIRouter, File, UploadFile, HTTPException
import shutil
from datetime import datetime
from database import get_db
import fitz  # PyMuPDF

router = APIRouter()

# Endpoint to handle PDF uploads
@router.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Define the path to save the uploaded file
        file_path = f"files/{file.filename}"
        # Save the uploaded file to the server
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text content from the saved PDF file
        text = extract_text_from_pdf(file_path)
        # Record the upload date
        upload_date = datetime.utcnow().isoformat()
        
        # Store the file metadata and extracted content in the database
        with get_db() as conn:
            conn.execute(
                "INSERT INTO pdf_documents (filename, upload_date, content) VALUES (?, ?, ?)",
                (file.filename, upload_date, text),
            )
            conn.commit()
        
        # Return a successful response with the filename
        return None
    except Exception as e:
        # Handle any exceptions that occur during the process
        raise HTTPException(status_code=400, detail=str(e))

# Function to extract text from a PDF file
def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text
