import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    alert('Logged in!');
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mt: 2 }} />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
    </form>
  );
};

export default Login;