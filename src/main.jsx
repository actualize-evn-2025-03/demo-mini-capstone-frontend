import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://demo-mini-capstone-api-vs8w.onrender.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
