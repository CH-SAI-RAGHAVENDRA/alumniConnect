
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="758149735201-k6p4kp0inmr32m0fe4bk22b9bgs4b58n.apps.googleusercontent.com">
      <App/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
