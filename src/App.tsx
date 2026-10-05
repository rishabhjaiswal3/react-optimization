import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Stats from './pages/Stats';
import Product from './pages/Product';
import Cart from './pages/Cart';
import NavBar from './components/NavBar';

function App() {  
  return (
   <>
   <NavBar />
   <main>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/about' element={<About />}/>
    <Route path='/cart' element={<Cart />}/>
    <Route path='/product/:productId' element={<Product />}/>
    <Route path='/stats' element={<Stats />}/>
   </Routes>
   </main>
   </>
  )
}

export default App
