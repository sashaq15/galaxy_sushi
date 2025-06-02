import styles from "../CartPage/CartPage.module.scss"
import basketCart from "@/assets/basketCart.svg"
import garbage from "@/assets/garbage.svg"
import { CartItem } from "@components/CartItem"
import { useDispatch, useSelector } from "react-redux"
import { cartSelector, deleteAllItems } from "@/store/cart/slice.tsx"
import { TSushiItem } from "@/store/sushi/types.tsx"
import { Link, useNavigate } from "react-router-dom"
import { Empty } from "@/components/Empty"
import { Button } from "@/components/Buttons"
import { caclTotalItems, caclTotalPrice } from "@/utils/caclTotal.tsx"
import { userSessionStorage } from "@/service/userSessionStorage"
import { UserLogo } from "@/components/User/UserLogo/UserLogo.tsx"
import { formatDate } from "@/utils/formatDate"
import {
  addUserOrdersToDB,
} from "@/service/db-service"
import { ModalPortal } from "@/components/ModalPortal"
import { useState } from "react"
import { userSelector } from "@/store/user/slice"
import { LoginPage, RegistrationPage } from "../AuthPages"



const CartPage = () => {
  const { itemsCart } = useSelector(cartSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const totalItems = caclTotalItems(itemsCart) || 0
  const totalPrice = caclTotalPrice(itemsCart) || 0

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleLogin, setIsVisibleLogin] = useState(false);
  const [isVisibleOrderSuccessfull, setIsVisibleOrderSuccessfull] = useState(false);
  const [isVisibleClearItems, setIsVisibleClearItems] = useState(false);

  const authUser = userSessionStorage.getSession()

  const {isLoginOpen} = useSelector(userSelector);


  

  const onClickPay = async () => {
    if (!authUser.accessToken) {
      setIsVisible(true)
    }
    if (authUser.id) {
      const date = formatDate(new Date())
      const order: any = {
        date: date,
        items: itemsCart
      }
      await addUserOrdersToDB(authUser.id, order)
      dispatch(deleteAllItems())
      setIsVisibleOrderSuccessfull(true)
    }
  }

  const onClickLogin = () => {
    setIsVisibleLogin(true);
    setIsVisible(false);
  }

  const onClickClearAllItems = () =>{
    dispatch(deleteAllItems());
    setIsVisibleClearItems(false);
  }



  return (
    <>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.cart__content}>
            <div className={styles.cart__logo}>
              {authUser.accessToken ? (
                <UserLogo />
              ) : null}
            </div>
            {(itemsCart === null || itemsCart.length) === 0 ? (
              <Empty />
            ) : (
              <div className={styles.cart__container}>
                <div className={styles.title}>
                  <div className={styles.basket}>
                    <img
                      src={basketCart}
                      alt=""
                      className={styles.basket__icon}
                    />
                    <h1 className="basket__name">Корзина</h1>
                  </div>

                  <div className={styles.clear__basket}>
                    <img src={garbage} alt="" className="clear__basket__icon" />
                    <div
       /*                onClick={() => dispatch(deleteAllItems())} */
                         onClick = {() => setIsVisibleClearItems(true)}
                      className={styles.clear__basket__name}
                    >
                      Очистить корзину
                    </div>
                  </div>
                </div>

                <ul className="cart__list">
                  {itemsCart?.map((item: TSushiItem, index: number) => (
                    <CartItem {...item} key={index} />
                  ))}
                </ul>
                <div className={styles.order__descr}>
                  <h2 className="count">
                    Всего: <span>{totalItems}шт</span>
                  </h2>
                  <h2 className="order__sum">
                    Сумма заказа: <span>{totalPrice} BYN</span>
                  </h2>
                </div>

                <div className={styles.cart__buttons}>
                  <Link to="/">
                    <Button onClick={null} variant={"basket"}>
                      {" "}
                      Вернуться назад
                    </Button>
                  </Link>
                  <Button onClick={onClickPay} variant={"basket"}>
                    {" "}
                    Оформить заказ
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      <ModalPortal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <div className={styles.alert}>
          Оформить заказ могут только авторизованные пользватели!
            <Button onClick={() => onClickLogin()} variant={""} >Войти</Button>
        </div>
      </ModalPortal>


      <ModalPortal isVisible={isVisibleLogin} onClose={() => setIsVisibleLogin(false) }>
      {isLoginOpen ? <RegistrationPage onClose={() => setIsVisibleLogin(false) }/> : <LoginPage onClose={() => setIsVisibleLogin(false) }/>}
      </ModalPortal>

      <ModalPortal isVisible={isVisibleClearItems} onClose={() => setIsVisibleClearItems(false) }>
        {<>
          <div className={styles.popupCart}> 
            <p>Вы действительно хотите очистить корзину?</p> 
            <div className={styles.popupCartBtns}>  
              <Button onClick={() => onClickClearAllItems()} variant={""}>Да</Button>
              <Button onClick={() => setIsVisibleClearItems(false)} variant={""}>Нет</Button>
            </div>
          </div>
        </> 
        }
      </ModalPortal>

      <ModalPortal isVisible={isVisibleOrderSuccessfull} onClose={() => setIsVisibleOrderSuccessfull(false)}>
        <div className={styles.alert}>
          <p>Спасибо! Ваш заказ оформлен!</p>
          <div className={styles.cartButtons}>
            <Button onClick={() => navigate("/")} variant={""} >На главную</Button>
            <Button onClick={() => navigate("/me/orders")} variant={""} >История заказов</Button>
          </div>
        </div>
      </ModalPortal>



    </>
  )
}

export { CartPage }

