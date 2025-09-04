import os
import google.generativeai as genai
import json
from dotenv import load_dotenv
from .schemas import Skill

load_dotenv() # Carga las variables del .env

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash') # Usamos el modelo más rápido

def extract_skills_from_text(text: str) -> list[Skill]:
    prompt = f"""
    Eres un experto en reclutamiento y recursos humanos especializado en el mercado laboral de Argentina para jóvenes sin experiencia.
    Tu tarea es analizar el siguiente texto que describe una experiencia informal o no laboral y extraer un máximo de 5 habilidades blandas o duras clave.
    El texto a analizar es: "{text}"

    Devuelve el resultado ÚNICAMENTE en formato JSON, como una lista de objetos. No incluyas la palabra "json" ni ningún otro texto antes o después del JSON.
    Cada objeto en la lista debe tener dos claves:
    1. "name": El nombre de la habilidad en español (ej: "Resolución de Conflictos").
    2. "description": Una explicación concisa (máximo 20 palabras) de cómo la experiencia descrita demuestra esa habilidad.

    Ejemplo de salida esperada:
    [
        {{"name": "Liderazgo", "description": "Tomaste la iniciativa para organizar y guiar a un grupo de personas hacia un objetivo común."}},
        {{"name": "Trabajo en Equipo", "description": "Colaboraste efectivamente con otros para lograr el éxito del proyecto."}}
    ]
    """
    try:
        response = model.generate_content(prompt)
        # Limpiamos la respuesta para asegurarnos que es solo JSON
        cleaned_response = response.text.strip().replace("```json", "").replace("```", "").strip()
        skills_data = json.loads(cleaned_response)
        # Validamos con Pydantic
        return [Skill(**item) for item in skills_data]
    except (json.JSONDecodeError, TypeError, ValueError) as e:
        print(f"Error parseando la respuesta del LLM: {e}")
        # En caso de error, devolvemos una lista vacía o un mensaje de error.
        return []