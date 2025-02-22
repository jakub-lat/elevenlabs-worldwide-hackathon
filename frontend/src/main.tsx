import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Start from './routes/Start.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Products from './routes/Products.tsx';
import Layout from './components/Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/browse" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  </StrictMode>,
)
