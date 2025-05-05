import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { BASE_URL } from '../api/constants';

function LinksPages() {
  const { username } = useParams();
  const [settings, setSettings] = useState({ title: '', links: [] });
  
  const fetchSettings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/pages/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log('Settings fetched:', settings);
  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ padding: 2, width: '80%', maxWidth: 600 }}>
        <Typography variant="h4" align="center">
          {settings?.title}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          {settings?.links?.length > 0 ? settings.links.map((link, index) => (
            <a href={`http://${link.url}`} target="_blank" rel="noopener noreferrer" key={index}>
              <Typography variant="body1" align="center" sx={{ textDecoration: 'none' }}>
                {link.text}
              </Typography>
            </a>
          )) : (
            <Typography variant="body1" align="center">No links available</Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
}

export default LinksPages;
