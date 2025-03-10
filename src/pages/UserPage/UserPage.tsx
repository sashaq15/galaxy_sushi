import { useEffect, useState } from "react"
import { HeaderUserPage } from "@/components/User/HeaderUserPage"
import { UserBlock } from "@/components/User/UserBlock"
import { Outlet } from "react-router-dom"
import { getUserFromDBById } from "@/service/db-service"

const UserPage = () => {
  const [firstName, setFirstName] = useState(null)
  const userId: any = sessionStorage.getItem("id")

  useEffect(() => {
    async function addUserDataFromDBToClient(userId: any) {
      const userData = await getUserFromDBById(userId)
      if (userData) {
        setFirstName(userData.firstName)
        console.log(userData.firstName)
      } else {
        console.log("пользватель не найден")
      }
    }

    addUserDataFromDBToClient(userId)
  }, [userId])

  return (
    <div className="wrapper">
      <div className="content">
        <HeaderUserPage first_Name={firstName}></HeaderUserPage>
        <div className="userContent">
          <UserBlock first_Name={firstName} />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export { UserPage }
