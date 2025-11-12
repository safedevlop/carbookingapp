// React entry point - renders the main App component
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import TailwindCSS styles
import App from './App';

// Create root element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);