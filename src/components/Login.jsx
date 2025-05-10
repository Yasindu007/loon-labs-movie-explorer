import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

// Login component allows the user to enter a username and password
const Login = () => {
  // State to store the username input
  const [username, setUsername] = useState('');
  // State to store the password input
  const [password, setPassword] = useState('');

  // This function runs when the user submits the login form
  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the page from reloading
    // Save the username to localStorage (simulates logging in)
    localStorage.setItem('username', username);
    alert('Logged in!'); // Show a simple alert
  };

  return (
    // The form element wraps the login fields and button
    <form onSubmit={handleLogin}>
      {/* Username input field */}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      {/* Password input field */}
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ mt: 2 }} // Adds margin on top
      />
      {/* Login button */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
    </form>
  );
};

export default Login;