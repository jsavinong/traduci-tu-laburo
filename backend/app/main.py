from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import SkillTranslationRequest, SkillTranslationResponse
from .services import extract_skills_from_text
from .database import save_translation

app = FastAPI()

origins = ["http://localhost:3000",
           "http://localhost:5173",
           "https://traduci-tu-laburo-mvp.web.app"
           ]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/v1/translate-skills", response_model=SkillTranslationResponse)
def translate_skills_endpoint(request: SkillTranslationRequest):
    if not request.experience_text or len(request.experience_text) < 20:
        raise HTTPException(status_code=400, detail="El texto es muy corto para ser analizado.")

    try:
        extracted_skills = extract_skills_from_text(request.experience_text)
        if not extracted_skills:
            raise HTTPException(status_code=500, detail="No se pudieron extraer habilidades. Intenta reformular tu texto.")

        # Guardamos en la base de datos (en segundo plano)
        save_translation(request.experience_text, extracted_skills)

        return SkillTranslationResponse(extracted_skills=extracted_skills)
    except Exception as e:
        print(f"Error inesperado: {e}")
        raise HTTPException(status_code=500, detail="Ocurrió un error interno en el servidor.")