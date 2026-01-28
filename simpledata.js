import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Close,
  Send,
  Search,
  Circle,
} from '@mui/icons-material';

const conversations = [
  {
    id: 1,
    user: {
      name: 'CyberSamurai',
      avatar: 'C',
      status: 'online',
      unread: 3,
    },
    lastMessage: 'Check out this new glitch I found!',
    time: '2 min ago',
  },
  {
    id: 2,
    user: {
      name: 'PixelPusher',
      avatar: 'P',
      status: 'online',
      unread: 0,
    },
    lastMessage: 'Join our raid tonight?',
    time: '1 hour ago',
  },
  {
    id: 3,
    user: {
      name: 'BugHunter',
      avatar: 'B',
      status: 'away',
      unread: 1,
    },
    lastMessage: 'Found the solution to that bug',
    time: '3 hours ago',
  },
];

function ChatBox({ open, onClose }) {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{
        width: 400,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 400,
          bgcolor: 'background.paper',
          borderLeft: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight="600">
              Messages
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          
          <TextField
            fullWidth
            size="small"
            placeholder="Search messages..."
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Box>

        {/* Conversations List */}
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {conversations.map((conv) => (
            <ListItem
              key={conv.id}
              button
              selected={activeChat?.id === conv.id}
              onClick={() => setActiveChat(conv)}
              sx={{
                '&:hover': { bgcolor: 'action.hover' },
                '&.Mui-selected': { bgcolor: 'primary.light' },
              }}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color={conv.user.status === 'online' ? 'success' : 'warning'}
                >
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {conv.user.avatar}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" fontWeight="600">
                      {conv.user.name}
                    </Typography>
                    {conv.user.unread > 0 && (
                      <Chip
                        label={conv.user.unread}
                        size="small"
                        sx={{ height: 20, bgcolor: 'primary.main', color: 'white' }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {conv.lastMessage}
                  </Typography>
                }
              />
              
              <Typography variant="caption" color="text.secondary">
                {conv.time}
              </Typography>
            </ListItem>
          ))}
        </List>

        {/* Chat Area */}
        {activeChat && (
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ 
              p: 2, 
              borderBottom: '1px solid', 
              borderColor: 'divider',
              bgcolor: 'background.default'
            }}>
              <Typography variant="subtitle1" fontWeight="600">
                {activeChat.user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {activeChat.user.status === 'online' ? 'Online' : 'Away'}
              </Typography>
            </Box>

            {/* Messages */}
            <Box sx={{ flexGrow: 1, p: 2, overflow: 'auto' }}>
              {/* Messages would go here */}
              <Typography color="text.secondary" align="center">
                Select a conversation to start chatting
              </Typography>
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton 
                      color="primary"
                      onClick={() => {
                        // Send message
                        setMessage('');
                      }}
                    >
                      <Send />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default ChatBox;