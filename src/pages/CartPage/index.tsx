import styles from '../CartPage/CartPage.module.scss'
import basketCart from '../../assets/basketCart.svg'
import garbage from '../../assets/garbage.svg'
import CartItem from "../../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, deleteAllItems } from "../../redux/cart/slice";
import { TSushiItem } from "../../redux/sushiSlice";
import { Link, useNavigate } from "react-router-dom";
import Empty from "../../components/Empty";
import Button from "../../components/Buttons/Button";
import { caclTotalItems, caclTotalPrice } from "../../utils/caclTotal";
import { getSession } from '../../storage/session';
import { UserLogo } from '../../components/User/UserLogo';


const CartPage = () => {
    const {itemsCart} = useSelector(cartSelector);
    console.log(itemsCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalItems = caclTotalItems(itemsCart) || 0;
    const totalPrice = caclTotalPrice(itemsCart) || 0;

    const authUser = getSession();

    const onClickPay = () => {
        if(!authUser.accessToken) {
            alert('Вы не авторизованы!')
        }

        alert('Заказ оплачен!')
        navigate('/')
    }
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>



            <div className={styles.cart__content}>
                <div className={styles.cart__logo}>
                    {authUser.accessToken ? <UserLogo first_Name={authUser.firstName}/> : null }
                </div>
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
                      <Button onClick={onClickPay} variant={"basket"}> Оплатить сейчас</Button>
                  </div>
              </div>
            ) }    
              

                </div>
       
            </div>
        </div>
    )
}

export default CartPage;