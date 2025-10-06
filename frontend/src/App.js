import React from 'react';
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';
import Menu from './pages/Menu';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <header>
          <h1>Menu</h1>
        </header>
        <Menu />
      </Container>
    </ThemeProvider>
  );
}

export default App;