import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '450056085759-8rui8cfmm8esvojoke893ikibh0oi8a6.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>  {/* Wrap the App with GoogleOAuthProvider */}
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);