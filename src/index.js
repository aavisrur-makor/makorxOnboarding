import { createTheme, ThemeProvider } from '@material-ui/core';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ChiefProvider from './components/ChiefProvider';
import './index.css';

const theme = createTheme({
  typography: {
    fontSize: 12,
    htmlFontSize: 13,
    fontFamily: '"Work Sans", "Roboto"',
  },
});

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ChiefProvider>
        <App />
      </ChiefProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
