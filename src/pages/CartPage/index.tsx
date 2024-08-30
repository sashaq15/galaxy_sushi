import Header from "../../components/Header";
import styles from '../CartPage/CartPage.module.scss'
import basketCart from '../../assets/basketCart.svg'
import garbage from '../../assets/garbage.svg'
import CartItem from "../../components/CartItem";

const CartPage = () => {
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
            <Header searchValue={""} onChangeSearchValue={undefined} clearSearchValue={undefined}/>
            <div className={styles.cart__content}>
                <div className={styles.cart__container}> 
                    <div className={styles.title}>
                        <div className={styles.basket}>
    
                            <img src={basketCart} alt="" className={styles.basket__icon} />
                            <h1 className="basket__name">Корзина</h1>
                        </div>

                        <div className={styles.clear__basket}>
                            <img src={garbage} alt="" className="clear__basket__icon" />
                            <p className={styles.clear__basket__name}>Очистить корзину</p>
                        </div>
                    </div>

                    <ul className="cart__list">
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                    </ul>

                    <div className={styles.order__descr}>
                        <h2 className="count">Всего: <span>23шт</span></h2>
                        <h2 className="order__sum">Сумма заказа: <span>1100</span></h2>
                    </div>

                    <div className={styles.cart__buttons}>
                        <button className={styles.btn}>&#8629; Вернуться назад</button>
                        <button className={styles.btn}>Оплатить сейчас</button>
                    </div>
                </div>

                </div>
          
            </div>
        </div>
    )
}

export default CartPage;