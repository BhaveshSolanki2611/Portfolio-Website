import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import initTouchSupport from './utils/touchSupport.js'

// Initialize touch support for mobile devices
if (typeof window !== 'undefined') {
  // Run after DOM is fully loaded
  window.addEventListener('DOMContentLoaded', () => {
    initTouchSupport();
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
