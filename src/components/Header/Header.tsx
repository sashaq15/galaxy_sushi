import logoSvg from "@/assets/logo.svg"
import loginSvg from "@/assets/login.svg"
import basketSvg from "@/assets/basket.svg"

import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import { cartSelector } from "@/store/cart/slice"
import { Search } from "../Search"
import { Button } from "../Buttons"
import { UserLogo } from "../User/UserLogo"
import { userSessionStorage } from "@/service/userSessionStorage"

import styles from "./header.module.scss"
import { ModalPortal } from "../ModalPortal"
import { LoginPage, RegistrationPage } from "@/pages/AuthPages"
import { useState } from "react"
import { userSelector } from "@/store/user/slice"

export interface ISearchProps {
  searchValue: string | null
  onChangeSearchValue: any
  clearSearchValue: any
}

const Header: React.FC<ISearchProps> = ({
  searchValue,
  onChangeSearchValue,
  clearSearchValue
}) => {
  const { totalPrice, totalItems } = useSelector(cartSelector)

  const [isVisible, setIsVisible] = useState(false);
  const {isLoginOpen} = useSelector(userSelector);

  const authUserName = userSessionStorage.getSession();

  return (
    <>
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header__content}>
            <Link className={styles.header__logo} to="/">
              <img src={logoSvg} className={styles.header__logo__icon} />
              <div className={styles.header__logo__descr}>
                <h1 className={styles.header__logo__descr__title}>
                  Галактика Суши
                </h1>
                <p className={styles.header__logo__descr__text}>
                  Лучшие суши в галактике!
                </p>
              </div>
            </Link>
            <Search
              searchValue={searchValue}
              onChangeSearchValue={onChangeSearchValue}
              clearSearchValue={clearSearchValue}
            />
            <div className={styles.header__cart}>
              <Link to="/cart">
                <Button onClick={null} variant="header">
                  <span className={styles.header__cart__price}>
                    {totalPrice.toFixed(1)} BYN
                  </span>
                  <img
                    src={basketSvg}
                    className={styles.header__cart__icon}
                  ></img>
                  <span className={styles.header__cart__count}>
                    {totalItems}
                  </span>
                </Button>
              </Link>

              {authUserName.id ? (
                <div className={styles.user__logo}>
                  <UserLogo />
                </div>
              ) : (
                  <Button onClick={() =>setIsVisible(true)} variant="login">
                    Войти
                    <img
                      src={loginSvg}
                      className={styles.header__cart__login}
                      alt=""
                    />
                  </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

<ModalPortal isVisible={isVisible} onClose={() => setIsVisible(false) }>
  {isLoginOpen ? <RegistrationPage onClose={() => setIsVisible(false) }/> : <LoginPage onClose={() => setIsVisible(false) }/>}
</ModalPortal>
</>
  )
}

export { Header }
