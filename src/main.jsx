import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import ShopContextProvider from './Context/ShopContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <ShopContextProvider>
      <App />
  </ShopContextProvider>
   
  </BrowserRouter>
);
