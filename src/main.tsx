import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/CartProvider';
import { ProductsProvider } from './context/ProductsProvider';
import { Analytics } from "@vercel/analytics/react"

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </GoogleOAuthProvider>
    <Analytics />
  </React.StrictMode>,
);
