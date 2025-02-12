import React, { useEffect, useState } from 'react'
import styles from './Orders.module.scss'
import { getUserOrderFromDBById } from '../../../../db/userData'
import { getSession } from '../../../../storage/session';
import { OrderBlock } from '../OrderBlock';
import { Outlet } from 'react-router-dom';

export const Orders = () => {
   const [data,setData] = useState<any>([]);
   const userAuth = getSession();
   
   useEffect(() => {
    async function getOrders() {
        if(userAuth.id) {
            const orders:any = await getUserOrderFromDBById(userAuth.id)
            setData(orders);
            }
       }
       getOrders()
   }, [])


  return (
    <div className={styles.root}>
        <ul className="orders">
        { data && data.length > 0 ?  
            (data.map((item: any, index:number) => (
              <OrderBlock order = {data[index]} key={data[index].date} number={index+1} />)
        )): <li>Нет заказов :( </li>}
        </ul>
        <Outlet></Outlet>
    </div>
  
  )
}
