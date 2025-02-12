import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import styles from './OrderDetalis.module.scss'
import { BsArrowLeftCircleFill } from 'react-icons/bs';

export const Detalis = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const {date, items,number, totalPrice} = location.state;
  
  return (
    <div className={styles.root}>
      <BsArrowLeftCircleFill onClick={() => navigate(-1)} className={styles.arrow}/>

            <div className={styles.order_Number}>Заказ № {number}</div>


          <div className="order_items">
              {items.map((item:any) => 
                <div className={styles.order_item}>

                <div className={styles.order_descr} >
                  <img src={item.imageUrl} alt="123" className="order_Img" key={item.id} /> 
                  <div className={styles.order_descr_right}>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.item_descr}>{item.descr}</p>
                    <div className={styles.item_footer}>
                      <span>{item.price} BYN</span>
                      <span> {item.count} Шт.</span>
                    </div>
                  </div>
                </div>
                <hr></hr>
                </div>

              )}  
          </div>
          <div className={styles.footer_descr}>
            <div className="totalPrice">Сумма заказа: <span>{totalPrice} BYN</span></div>
            <div className="orderDate">Время заказа: <span>{date}</span></div>
          </div>
    </div> ) 
  
}
