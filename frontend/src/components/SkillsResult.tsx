import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import type { Skill } from '../services/api';

interface Props {
  skills: Skill[];
}

export const SkillsResult: React.FC<Props> = ({ skills }) => {
  if (skills.length === 0) return null;

  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        ¡Estos son tus talentos ocultos!
      </Typography>
      {skills.map((skill) => (
        <Card key={skill.name} sx={{ mb: 2 }}>
          <CardContent>
            <Chip label={skill.name} color="primary" sx={{ mb: 1, fontWeight: 'bold' }} />
            <Typography variant="body2" color="text.secondary">
              {skill.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};