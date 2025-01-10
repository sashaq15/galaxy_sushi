import  { useEffect, useState } from 'react'
import HeaderUserPage from '../../../components/User/HeaderUserPage';
import UserBlock from '../../../components/User/UserBlock';
import { Outlet, useNavigate } from 'react-router-dom';
import { endSession } from '../../../storage/session';
import { getUserFromDBById } from '../../../db/userData';


const UserPage = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    endSession();
    navigate('/')
    console.log('Вы разлогинились')
  }

    const [firstName, setFirstName] = useState(null)
    const userId:any = sessionStorage.getItem('id');
  
useEffect(() => {
  async function addUserDataFromDBToClient(userId:any) {
    const userData = await getUserFromDBById(userId);
    console.log('данные пользвателя:', userData )
    if(userData) {
      setFirstName(userData.firstName)
      console.log(userData.firstName)
    } else {
      console.log('пользватель не найден')
    }
  }

  addUserDataFromDBToClient(userId);
}
,[userId])





  return (
    <div className="wrapper">
            <div className="content">
            <HeaderUserPage first_Name={firstName}></HeaderUserPage>
              <div className="userContent">
                <UserBlock first_Name={firstName}/>
                <Outlet/>
              </div>
            </div>
    </div>

  )
}

export default UserPage;
