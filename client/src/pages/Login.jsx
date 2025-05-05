import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { BASE_URL } from '../api/constants';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'Error to login');
      setIsError(true);
    }
  };

  const boxStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
  };

  return (
    <Box sx={boxStyles}>
      <Typography variant="h6">
        Login
      </Typography>
      <TextField
        required
        label="Email"
        onChange={handleChange}
        name='email'
        value={credentials.email}
        sx={{ m: 1, width: '100%' }}
      />
      <TextField
        required
        label="Password"
        type="password"
        onChange={handleChange}
        name='password'
        value={credentials.password}
        sx={{ m: 1, width: '100%' }}
      />
      <Button onClick={handleSubmit} variant="contained">Login</Button>
      <Button onClick={() => navigate('/signup')} variant="text">Create account</Button>

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => {
          setIsError(false)
          setError('')
        }}>
          <Alert
            severity="error"
            variant="filled"
          >
            {error}
          </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
