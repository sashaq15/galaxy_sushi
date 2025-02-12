import { Link } from 'react-router-dom';
import styles from './order.module.scss'
import { useEffect, useState } from 'react';
import { Detalis } from '../OrderDetalis';
import { caclTotalPrice } from '../../../../utils/caclTotal.tsx';
import { useDispatch } from 'react-redux';


export const OrderBlock = ({order,number}: any) => {


  
  const {date, items} = order;

  const  totalPrice = caclTotalPrice(items);
  return (

    <div className={styles.root}>

          <li className={styles.order}>
          <p className="orderNumber">Заказ №{number}</p>
          <div className="order_Imgs">
              {items.map((item:any) => {
                return   (<img src={item.imageUrl} alt="123" className="order_Img" key={item.id} /> )
              })}
              
          </div>
          <Link to={'detalis'} state={{...order,number,totalPrice}} className={styles.order_detalis}>Детали заказа</Link>
          <div className={styles.orders_footer}>
            <span className="totalPrice">Сумма заказа: {totalPrice} BYN</span>
            <span className="orderDate">Врем заказа: {date}</span>
            </div>
          <hr className={styles.hr}></hr>
        </li>
    </div> ) 
  
}