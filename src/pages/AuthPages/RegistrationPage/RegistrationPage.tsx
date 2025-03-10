import { Link, useLocation, useNavigate } from "react-router-dom"

import styles from "../Auth.module.scss"
import { useState } from "react"
import { Button, ButtonRound } from "@/components/Buttons"
import { ErrorPopup } from "@/components/ErrorPopup"
import { createUser } from "@/service/auth"
import { userSessionStorage } from "@/service/userSessionStorage"
import { addUserToDB } from "@/service/db-service"

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [repeatPassword, setRepeatPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [error, setError] = useState<string>("")

  const onSubmit = async (event: any) => {
    event.preventDefault()
    if (!password || !email || !firstName) {
      setError("Заполните полностью все поля")
      return
    }

    if (!email.includes("@")) {
      setError("Введите корректный email")
      return
    }

    if (password !== repeatPassword) {
      setError("Введённые вами пароли не совпадают")
      return
    }
    setError("")
    console.log("Вход выполнен")

    try {
      let registerResponse = await createUser(email, password)
      userSessionStorage.startSession(
        registerResponse.user,
        registerResponse.user.uid,
        firstName
      )
      addUserToDB(email, firstName, registerResponse.user.uid)
      navigate("/me")
    } catch (error: any) {
      console.error(error.message)
      setError(error.message)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.modalDiv}>
        <div className={styles.modal}>
          <h3>Регистрация</h3>
          <div className={styles.closeButton}>
            <ButtonRound
              onClick={() => navigate(-1)}
              variant={"closeIcon"}
              disabled={null}
            >
              x
            </ButtonRound>
          </div>
          {error && <ErrorPopup>{error}</ErrorPopup>}

          <form onSubmit={onSubmit}>
            <input
              type="text"
              name={firstName}
              value={firstName}
              placeholder="Введите своё имя"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              name={email}
              value={email}
              autoComplete="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name={password}
              value={password}
              autoComplete="new-password"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name={repeatPassword}
              value={repeatPassword}
              autoComplete="repeat-new-passwor"
              placeholder="Повторите пароль"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <p>
              У вас уже есть аккаунт?
              <span onClick={() => navigate(-1)}> Войти</span>
            </p>
            <Button onClick={undefined} variant={"loginAuth"}>
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { RegistrationPage }
