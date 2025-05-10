import React, { useContext, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Film, Heart, LogIn } from 'lucide-react'; // Removed unused 'User'
import ThemeToggle from './ThemeToggle';
import { MovieContext } from '../context/MovieContext';

const Header = () => {
  const { darkMode, setSearch } = useContext(MovieContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  const username = localStorage.getItem('username');
  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    handleUserMenuClose();
    window.location.reload();
  };

  const handleGoHome = () => {
    setSearch('');
    localStorage.removeItem('lastSearch');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      label: 'Home', 
      icon: <Film size={18} />, 
      path: '/' 
    },
    { 
      label: 'Favorites', 
      icon: <Heart size={18} />, 
      path: '/favorites' 
    }
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Movie Explorer
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.label} 
            component={Link} 
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              borderRadius: 1,
              mx: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }
            }}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {!username && (
          <ListItem 
            button 
            component={Link} 
            to="/login"
            selected={isActive('/login')}
            sx={{
              borderRadius: 1,
              mx: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }
            }}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <LogIn size={18} />
            </Box>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backdropFilter: 'blur(8px)',
        bgcolor: darkMode ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.95)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Mobile menu button with better contrast */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{
                color: darkMode ? '#fff' : '#1976d2', // Use primary color in light mode
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Logo with better visibility */}
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            onClick={handleGoHome}
            sx={{ 
              fontWeight: 'bold',
              textDecoration: 'none',
              color: darkMode ? '#fff' : '#1976d2', // Use primary color in light mode
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <Film 
              size={24} 
              style={{ 
                marginRight: '8px',
                color: 'inherit'
              }} 
            />
            Movie Explorer
          </Typography>

          {/* Desktop Navigation with improved contrast */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button 
                  key={item.label}
                  component={Link}
                  to={item.path}
                  onClick={item.path === '/' ? handleGoHome : undefined}
                  sx={{ 
                    mx: 1,
                    borderRadius: '8px',
                    color: darkMode ? '#fff' : '#1976d2', // Use primary color in light mode
                    backgroundColor: isActive(item.path) 
                      ? (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(25,118,210,0.1)') 
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: darkMode 
                        ? 'rgba(255,255,255,0.15)' 
                        : 'rgba(25,118,210,0.15)',
                    }
                  }}
                >
                  <Box sx={{ 
                    mr: 1, 
                    display: 'flex', 
                    alignItems: 'center',
                    color: 'inherit'
                  }}>
                    {item.icon}
                  </Box>
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* User section with improved visibility */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeToggle />
            
            {username ? (
              <>
                <Button 
                  sx={{ 
                    ml: 1, 
                    textTransform: 'none',
                    color: darkMode ? '#fff' : '#1976d2', // Use primary color in light mode
                  }}
                  onClick={handleUserMenuOpen}
                  startIcon={
                    <Avatar sx={{ 
                      width: 28, 
                      height: 28, 
                      bgcolor: darkMode ? 'primary.main' : 'primary.dark'
                    }}>
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                >
                  {!isMobile && username}
                </Button>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              !isMobile && (
                <Button 
                  component={Link} 
                  to="/login"
                  sx={{ 
                    ml: 1,
                    color: darkMode ? '#fff' : '#1976d2', // Use primary color in light mode
                  }}
                  startIcon={<LogIn size={18} />}
                >
                  Login
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile Drawer with improved contrast */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;