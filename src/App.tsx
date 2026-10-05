import { lazy, Suspense } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';

const Stats = lazy(() => import('./pages/Stats'))
const Cart = lazy(() => import('./pages/Cart'))
const Product = lazy(() => import('./pages/Product'))
const About = lazy(() => import('./pages/About'))

function App() {  
  return (
   <>
   <NavBar />
   <main>
    <Suspense fallback={<div className="p-6 text-slate-500">Loading…</div>} >
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/product/:productId' element={<Product />}/>
          <Route path='/stats' element={<Stats />}/>
        </Routes>
    </Suspense>
   </main>
   </>
  )
}

export default App
