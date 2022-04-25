import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.scss';
import App from './App';

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import {UserProvider} from './contexts';
// import i18n (needs to be bundled ;))
import './i18n';

const theme = createTheme({
    palette: {
        primary: {
            main: "#00632e"
        },
        secondary: {
            main: "#73bf39"
        }
    },
});

const pca = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <MsalProvider instance={pca}>
              <UserProvider>
                <App />
            </UserProvider>
          </MsalProvider>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
