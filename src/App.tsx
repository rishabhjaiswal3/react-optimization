import { lazy, Suspense } from 'react';
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';

const Stats = lazy(() => import('./pages/Stats'))
const Cart = lazy(() => import('./pages/Cart'))
const Product = lazy(() => import('./pages/Product'))
const About = lazy(() => import('./pages/About'))

function App() {  
  const { pathname } = useLocation();

  return (
   <>
   <NavBar />
   <main>
    <ErrorBoundary key={pathname}>
      <Suspense fallback={<div className="p-6 text-slate-500">Loading…</div>} >
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/product/:productId' element={<Product />}/>
            <Route path='/stats' element={<Stats />}/>
          </Routes>
      </Suspense>
    </ErrorBoundary>
   </main>
   </>
  )
}

export default App
