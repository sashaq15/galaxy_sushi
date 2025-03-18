import { useEffect, useState } from "react"
import { HeaderUserPage } from "@/components/User/HeaderUserPage"
import { UserBlock } from "@/components/User/UserBlock"
import { Outlet } from "react-router-dom"
import { getUserFromDBById } from "@/service/db-service"
import { useDispatch, useSelector } from "react-redux"
import { getFirstName, userSelector } from "@/store/user/slice"

const UserPage = () => {
  const userId: any = sessionStorage.getItem("id")
  const dispatch = useDispatch();


  useEffect(() => {
    async function addUserDataFromDBToClient(userId: any) {
      const userData = await getUserFromDBById(userId)
      if (userData) {
        dispatch(getFirstName(userData.firstName))
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
        <HeaderUserPage/>
        <div className="userContent">
          <UserBlock/>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export { UserPage }
