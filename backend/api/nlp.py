from langchain import OpenAI

llm = OpenAI()

def answer_question(pdf_text: str, question: str) -> str:
    response = llm.query({
        'prompt': f'Given the text: "{pdf_text}", answer the question: "{question}"',
        'max_tokens': 150
    })
    return response['choices'][0]['text']