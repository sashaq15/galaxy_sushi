import { Route, Routes, useLocation} from 'react-router-dom';
import MainPage from './pages/MainPage';
import './scss/app.scss';
import CartPage from './pages/CartPage';
import Modal from './components/Modal';
import { useEffect } from 'react';
import LoginPage from './pages/Auth/LoginPage';
import RegistrationPage from './pages/Auth/RegistrationPage';
import UserPage from './pages/Auth/UserPage/UserPage';
import UserBlock from './components/User/UserBlock';
import NotFoundBlock from './components/NotFoundBlock';
import Account from './components/User/Account';
import { Orders } from './components/User/Orders/Orders';
import { Detalis } from './components/User/Orders/OrderDetalis';


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
          <Route path="/me" element={<UserPage/>}>
            <Route path="account" element={<Account/>}></Route>
            <Route path="orders" element={<Orders/>}></Route>
            <Route path="orders/detalis" element={<Detalis/>}/>
          </Route>
          <Route path="/modal/:id" element={<Modal/>}/>
          <Route path='*' element={<MainPage/>}/>
      </Routes>

      {background &&  (
     <Routes>
        <Route path="/modal/:id"  element={<Modal/>}/> 
        <Route path="/login"  element={<LoginPage/>}/> 
        <Route path="/registration"  element={<RegistrationPage/>}/>
     </Routes>
       )
      }


    </>
  )


}

export default App
