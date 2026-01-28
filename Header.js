import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  Games as GamesIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

function Header({ onMenuClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo & Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GamesIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h5" sx={{ 
              fontWeight: 700, 
              background: 'linear-gradient(45deg, #00a2ff, #8a2be2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Glitch Guild
            </Typography>
          </Box>

          <Box sx={{ 
            position: 'relative',
            bgcolor: 'background.default',
            borderRadius: 2,
            px: 2,
            py: 0.5
          }}>
            <SearchIcon sx={{ 
              position: 'absolute', 
              left: 10, 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'text.secondary'
            }} />
            <InputBase
              placeholder="Search games, posts, users..."
              sx={{ 
                ml: 4,
                color: 'text.primary',
                '& .MuiInputBase-input': {
                  width: '300px'
                }
              }}
            />
          </Box>
        </Box>

        {/* Right: Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton>
            <Badge badgeContent={5} color="primary">
              <ChatIcon />
            </Badge>
          </IconButton>
          
          <IconButton onClick={handleMenu}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40,
                bgcolor: 'primary.main'
              }}
            >
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <PersonIcon sx={{ mr: 2 }} /> My Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <GamesIcon sx={{ mr: 2 }} /> My Games
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ChatIcon sx={{ mr: 2 }} /> Messages
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Header;