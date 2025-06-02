import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

import { getUserOrderFromDBById } from "@service/db-service"
import { userSessionStorage } from "@/service/userSessionStorage"
import { OrderBlock } from "../OrderBlock"

import styles from "./Orders.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { getUserOrders, orderSelector } from "@/store/order/slice"

const Orders = () => {
  const dispatch = useDispatch();
  const userAuth = userSessionStorage.getSession();
  const { items } = useSelector(orderSelector)

  useEffect(() => {
    async function getOrders() {
      if (userAuth.id) {
        const orders: any = await getUserOrderFromDBById(userAuth.id)
        dispatch(getUserOrders({items: orders}))
      }
    }
    getOrders()
  }, [])



  return (
    <div className={styles.root}>
      <ul className="orders">
        {items && items.length > 0 ? (
          items.map((item: any, index: number) => (
            <OrderBlock
              order={items[index]}
              key={items[index].date}
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
