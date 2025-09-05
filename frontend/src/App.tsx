// frontend/src/App.tsx
import { useState } from 'react';
import { Container, Typography, Box, CssBaseline, Alert } from '@mui/material';
import { ExperienceForm } from './components/ExperienceForm';
import { SkillsResult } from './components/SkillsResult';
import { translateSkills } from './services/api';
import type { Skill } from './services/api';

function App() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setSkills([]);
    try {
      const response = await translateSkills(text);
      setSkills(response.extracted_skills);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Ocurrió un error inesperado. Inténtalo de nuevo.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Traducí tu Laburo
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center">
            Convierte tus experiencias del día a día en habilidades profesionales para tu CV.
          </Typography>

          <ExperienceForm onSubmit={handleFormSubmit} isLoading={isLoading} />

          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}

          <SkillsResult skills={skills} />

        </Box>
      </Container>
    </>
  );
}

export default App;