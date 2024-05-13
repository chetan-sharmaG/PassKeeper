import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="676256167848-geg7fsv93inhda860s6c5k6d42g4qngd.apps.googleusercontent.com">
   
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </GoogleOAuthProvider>,
)
