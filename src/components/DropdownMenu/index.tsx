import { Link } from 'react-router-dom'
import { endSession } from '../../storage/session';

const DropdownMenu = () => {

  return (
       <ul>
        <Link to='/me/account'><li>Личный кабинет</li></Link>
        <hr></hr>
        <Link to='/me/orders'><li>История заказов</li></Link>
        <hr></hr>
        <Link onClick={() => endSession()} to='/'><li>Выйти</li></Link>
       </ul>

  )
}

export default DropdownMenu