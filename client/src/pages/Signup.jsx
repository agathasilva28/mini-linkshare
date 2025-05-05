import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BASE_URL } from '../api/constants';

function Signup() {
  const [user, setUser] = useState({ name: '', email: '', password: '', username: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${BASE_URL}/users`, user);
      navigate('/login');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h6">
        Create an Account
      </Typography>
      <TextField
        required
        label="Name"
        value={user.name}
        onChange={handleChange}
        name='name'
        sx={{ m: 1, width: '100%' }}
      />
      <TextField
        required
        label="Username"
        value={user.username}
        onChange={handleChange}
        name='username'
        sx={{ m: 1, width: '100%' }}
      />
      <TextField
        required
        label="Email"
        value={user.email}
        onChange={handleChange}
        name='email'
        sx={{ m: 1, width: '100%' }}
      />
      <TextField
        required
        label="Password"
        type="password"
        name='password'
        value={user.password}
        onChange={handleChange}
        sx={{ m: 1, width: '100%' }}
      />
      <Button onClick={handleSubmit} variant="contained">Create account</Button>
      <Button onClick={() => navigate('/login')} variant="text">Login</Button>
    </Box>
  );
}

export default Signup;
