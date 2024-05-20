import sqlite3
from contextlib import contextmanager

DATABASE_URL = "test.db"

def init_db():
    with sqlite3.connect(DATABASE_URL) as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS pdf_documents (
                            id INTEGER PRIMARY KEY,
                            filename TEXT UNIQUE,
                            upload_date TEXT,
                            content TEXT
                        )''')
        conn.commit()

@contextmanager
def get_db():
    conn = sqlite3.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        conn.close()