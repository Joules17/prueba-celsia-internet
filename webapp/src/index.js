import { CssVarsProvider } from '@mui/joy/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import theme from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssVarsProvider theme = {theme}>
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);

