import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

interface Props {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export const ExperienceForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSubmit(text);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
      <TextField
        fullWidth
        multiline
        rows={6}
        variant="outlined"
        label="Describí tu experiencia acá"
        placeholder="Ej: Organicé un torneo de fútbol en mi barrio para juntar fondos y compramos redes nuevas para los arcos..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2, p: 1.5, fontSize: '1.1rem' }}
        disabled={isLoading || !text.trim()}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Descubrir mis Talentos'}
      </Button>
    </Box>
  );
};