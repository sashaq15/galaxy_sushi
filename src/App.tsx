import { BrowserRouter, Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import './scss/app.scss';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import Modal from './components/Modal';
import { useEffect } from 'react';

function App() {

  const location = useLocation();
  const background = location.state?.background

  useEffect(() => {
    if (background) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [background]);
 


  return (
    <>

      <Routes location={background || location}>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path="/modal/:id" element={<Modal/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
      </Routes>

      {background && 
     
        <Route path="/modal/:id" element={<Modal/>}/>
      }


    </>
  )


}

export default App
