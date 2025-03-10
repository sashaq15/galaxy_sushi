import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

import { getUserOrderFromDBById } from "@service/db-service"
import { userSessionStorage } from "@/service/userSessionStorage"
import { OrderBlock } from "../OrderBlock"

import styles from "./Orders.module.scss"

const Orders = () => {
  const [data, setData] = useState<any>([])
  const userAuth = userSessionStorage.getSession()

  useEffect(() => {
    async function getOrders() {
      if (userAuth.id) {
        const orders: any = await getUserOrderFromDBById(userAuth.id)
        setData(orders)
      }
    }
    getOrders()
  }, [])

  return (
    <div className={styles.root}>
      <ul className="orders">
        {data && data.length > 0 ? (
          data.map((item: any, index: number) => (
            <OrderBlock
              order={data[index]}
              key={data[index].date}
              number={index + 1}
            />
          ))
        ) : (
          <li>Нет заказов :( </li>
        )}
      </ul>
      <Outlet></Outlet>
    </div>
  )
}

export { Orders }
