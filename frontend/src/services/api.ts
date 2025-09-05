import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Definimos los tipos para que coincidan con Pydantic
export interface Skill {
  name: string;
  description: string;
}

export interface SkillTranslationResponse {
  extracted_skills: Skill[];
}

export const translateSkills = async (experienceText: string): Promise<SkillTranslationResponse> => {
  const response = await apiClient.post('/translate-skills', {
    experience_text: experienceText,
  });
  return response.data;
};