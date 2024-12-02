import styles from '../CartPage/CartPage.module.scss'
import basketCart from '../../assets/basketCart.svg'
import garbage from '../../assets/garbage.svg'
import CartItem from "../../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, deleteAllItems } from "../../redux/cartSlice";
import { TSushiItem } from "../../redux/sushiSlice";
import { Link } from "react-router-dom";
import Empty from "../../components/Empty";
import Button from "../../components/Buttons/Button";
import { caclTotalItems, caclTotalPrice } from "../../utils/caclTotal";


const CartPage = () => {
    const {itemsCart} = useSelector(cartSelector);
    const dispatch = useDispatch();

    const totalItems = caclTotalItems(itemsCart) || 0;
    const totalPrice = caclTotalPrice(itemsCart) || 0;

    console.log(totalPrice);

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
      


            <div className={styles.cart__content}>
            { (itemsCart === null || itemsCart.length) === 0 ? <Empty/> : (
                  <div className={styles.cart__container}> 
          
                  <div className={styles.title}>
                      <div className={styles.basket}>
  
                          <img src={basketCart} alt="" className={styles.basket__icon} />
                          <h1 className="basket__name">Корзина</h1>
                      </div>

               

                      <div className={styles.clear__basket}>
                          <img src={garbage} alt="" className="clear__basket__icon" />
                          <p onClick={() => dispatch(deleteAllItems())} className={styles.clear__basket__name}>Очистить корзину</p>
                      </div>
                  </div>

                  <ul className="cart__list">
                     { 
                      itemsCart?.map((item: TSushiItem ,index:number) =>  <CartItem {...item} key={index}/> )
                      } 

                  </ul>
                  <div className={styles.order__descr}>

                      <h2 className="count">Всего: <span>{totalItems}шт</span></h2>
                      <h2 className="order__sum">Сумма заказа: <span>{totalPrice} BYN</span></h2>
                  </div>

                  

                  <div className={styles.cart__buttons}>
                      <Link to='/'>
                          <Button onClick={null} variant={"basket"}> Вернуться назад</Button>
                      </Link>
                      <Button onClick={null} variant={"basket"}> Оплатить сейчас</Button>
                  </div>
              </div>
            ) }    
              

                </div>
       
            </div>
        </div>
    )
}

export default CartPage;