import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  Avatar, 
  InputAdornment, 
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import { LogIn, Eye, EyeOff, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would be an API call
      localStorage.setItem('username', username);
      setSnackbarOpen(true);
      
      // Wait for snackbar to show before redirecting
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 2,
            borderRadius: 2,
            transition: 'all 0.3s ease'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <Avatar 
              sx={{ 
                m: 1, 
                bgcolor: 'primary.main',
                width: 56,
                height: 56
              }}
            >
              <LogIn size={32} />
            </Avatar>
            
            <Typography component="h1" variant="h5" gutterBottom>
              {isLoggedIn ? 'You are logged in' : 'Sign In'}
            </Typography>
            
            {isLoggedIn ? (
              <Box sx={{ width: '100%', mt: 2 }}>
                <Alert severity="success" sx={{ mb: 3 }}>
                  You are currently logged in as <strong>{username}</strong>
                </Alert>
                
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                  startIcon={<LogIn />}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <User size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  startIcon={<LogIn />}
                >
                  Sign In
                </Button>
                
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  Note: This is a demo app. No real authentication is performed.
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled">
          Successfully logged in!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Login;