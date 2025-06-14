import { Route, Routes, useLocation } from "react-router-dom"
import { MainPage } from "@/pages/MainPage"
import "./styles/app.scss"
import { CartPage } from "@/pages/CartPage"
import { Modal } from "@/components/Modal"
import { useEffect } from "react"
import { LoginPage, RegistrationPage } from "@/pages/AuthPages"
import { UserPage } from "@/pages/UserPage"
import { Account } from "@/components/User/Account"
import { Orders, OrderDetalis } from "@/components/Orders"
import { NotFoundPage } from "./pages/NotFoundPage"

function App() {
  const location = useLocation()
  const background = location.state?.background

  useEffect(() => {
    if (background) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [background])
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/me" element={<UserPage />}>
          <Route path="account" element={<Account />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="orders/detalis" element={<OrderDetalis />} />
        </Route>
        <Route path="/modal/:id" element={<Modal />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/modal/:id" element={<Modal />} />
        </Routes>
      )}
    </>
  )
}

export default App
