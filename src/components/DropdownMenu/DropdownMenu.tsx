import { Link } from "react-router-dom"
import { userSessionStorage } from "@/service/userSessionStorage"

const DropdownMenu = () => {
  return (
    <ul>
      <Link to="/me/account">
        <li>Личный кабинет</li>
      </Link>
      <hr></hr>
      <Link to="/me/orders">
        <li>История заказов</li>
      </Link>
      <hr></hr>
      <Link onClick={() => userSessionStorage.endSession()} to="/">
        <li>Выйти</li>
      </Link>
    </ul>
  )
}

export { DropdownMenu }
