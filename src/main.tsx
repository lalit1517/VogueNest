import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/CartProvider'
import { ProductsProvider } from './context/ProductsProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1002159695430-l0qcpognb1n7vd1saalcubg1c1617mlc.apps.googleusercontent.com">
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)