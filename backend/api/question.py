from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db
from langchain_openai import OpenAI  

llm = OpenAI()

def answer_question(pdf_text: str, question: str) -> str:
    prompt = f'Given the text: "{pdf_text}", answer the question: "{question}"'
    response = llm.generate([prompt], max_tokens=150)
    return response.generations[0][0].text.strip()



router = APIRouter()

class Question(BaseModel):
    filename: str
    question: str

class Answer(BaseModel):
    answer: str

@router.post("/ask/", response_model=Answer)
async def ask_question(question: Question):
    with get_db() as conn:
        cursor = conn.execute("SELECT content FROM pdf_documents WHERE filename = ?", (question.filename,))
        row = cursor.fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="PDF not found")
        pdf_text = row[0]

    answer = answer_question(pdf_text, question.question)
    return Answer(answer=answer)
