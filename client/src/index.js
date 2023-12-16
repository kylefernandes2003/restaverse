// src/index.js or your entry point file
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './components/AuthContext';

ReactDOM.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="463874663036-kg6ith2t9lkk533smmqm6rhncs7sfj6l.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);