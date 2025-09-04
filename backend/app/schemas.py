from pydantic import BaseModel
from typing import List

class SkillTranslationRequest(BaseModel):
    experience_text: str

class Skill(BaseModel):
    name: str
    description: str

class SkillTranslationResponse(BaseModel):
    extracted_skills: List[Skill]