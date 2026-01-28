import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import GameHub from './pages/GameHub';
import ChatBox from './components/ChatBox';

// Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00a2ff',
    },
    secondary: {
      main: '#8a2be2',
    },
    background: {
      default: '#0f1117',
      paper: '#1a1d29',
    },
    text: {
      primary: '#ffffff',
      secondary: '#8f9bba',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/game/:id" element={<GameHub />} />
              </Routes>
            </Box>
          </Box>

          <ChatBox open={chatOpen} onClose={() => setChatOpen(false)} />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;