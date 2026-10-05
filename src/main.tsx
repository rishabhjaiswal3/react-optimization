import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProductProvider from './contexts/ProductContext.tsx';
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from 'react';
import CartProvider from './contexts/CartContext.tsx';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

onLCP(console.log)
onINP(console.log)
onCLS(console.log)
onFCP(console.log)
onTTFB(console.log)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ProductProvider >
                <CartProvider>
                    <App />
                </CartProvider>
            </ProductProvider>
        </BrowserRouter>
    </StrictMode>
)
