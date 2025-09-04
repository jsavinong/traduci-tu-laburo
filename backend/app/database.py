# backend/app/database.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime, timezone

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client.hidden_talents_db # Nombre de tu base de datos
translations_collection = db.translations # Nombre de tu colección

def save_translation(text: str, skills: list):
    # Convertimos los objetos Pydantic a dicts para MongoDB
    skills_dicts = [skill.model_dump() for skill in skills]
    translations_collection.insert_one({
        "inputText": text,
        "extractedSkills": skills_dicts,
        "createdAt": datetime.now(timezone.utc)
    })