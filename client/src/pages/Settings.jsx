import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { BASE_URL } from '../api/constants';

const LINK_DEFAULT = { text: '', url: '' };

function Settings() {
  const [settings, setSettings] = useState({ title: '', links: [] });
  const [currentLink, setCurrentLink] = useState(LINK_DEFAULT);
  const [editingIndex, setEditingIndex] = useState(null);
  const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'});
  const navigate = useNavigate();

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/pages/settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleEditLink = (index) => {
    setCurrentLink(settings.links[index]);
    setEditingIndex(index);
  };

  const handleAddLink = () => {
    if (editingIndex !== null) {
      const updatedLinks = settings.links.map((link, index) =>
        index === editingIndex ? currentLink : link
      );
      setSettings((prevSettings) => ({
        ...prevSettings,
        links: updatedLinks,
      }));
      setEditingIndex(null);
    } else {
      setSettings((prevSettings) => ({
        ...prevSettings,
        links: [...prevSettings.links, currentLink],
      }));
    }
    setCurrentLink(LINK_DEFAULT);
  };

  const handleRemoveLink = (index) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      links: prevSettings.links.filter((_, i) => i !== index),
    }));
  }

  const changeTitle = (e) => {
    setSettings({ ...settings, title: e.target.value });
  }

  const handleChange = (e) => {
    setCurrentLink({ ...currentLink, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/pages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      const data = await response.json();
      setSnackbar({
        open: true,
        message: 'Settings saved successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: 'success',
      });
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h6">
        Settings
      </Typography>

      <TextField
        required
        label="Page Title"
        name="title"
        onChange={changeTitle}
        value={settings.title}
        sx={{ m: 1, width: '100%' }}
      />

      <Typography variant="h6">
        Links
      </Typography>
      
      {settings.links.map((link, index) => (
        <Card key={index} sx={{ width: '100%', padding: '10px', margin: '10px 0' }}>
          <Typography variant="body1">{link.text}</Typography>
          <Typography variant="body2" color="textSecondary">{link.url}</Typography>
          <Button onClick={() => handleEditLink(index)} variant="text">Editar</Button>
          <Button color="error" onClick={() => handleRemoveLink(index)} variant="text">Remove</Button>
        </Card>
      ))}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TextField
          required
          label="Text"
          onChange={handleChange}
          value={currentLink.text}
          name="text"
          sx={{ m: 1 }}
        />
        <TextField
          required
          label="Url"
          onChange={handleChange}
          value={currentLink.url}
          name="url"
          sx={{ m: 1 }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">http://</InputAdornment>,
            },
          }}
        />
        <Button onClick={handleAddLink} variant="text">
          {editingIndex !== null ? 'Atualizar Link' : 'Adicionar Link'}
        </Button>
      </Box>

      <Button onClick={handleSubmit} variant="contained">Save</Button>
      <Button onClick={() => navigate(`/pages/${settings.user.username}`)} variant="text">Preview Page</Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => {
          setIsError(false)
          setError('')
        }}>
          <Alert
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
      </Snackbar>
    </Box>
  );
}

export default Settings;