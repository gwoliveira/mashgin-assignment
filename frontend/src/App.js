import React from 'react';
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';

import { CartProvider } from './context/CartContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <CssBaseline />
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#29b6f6',
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              The Golden Spoon
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Container>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
