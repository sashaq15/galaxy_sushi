import { Link, useLocation, useNavigate } from "react-router-dom"

import styles from "../Auth.module.scss"
import { useState } from "react"
import { Button, ButtonRound } from "@/components/Buttons"
import { ErrorPopup } from "@/components/ErrorPopup"
import { signInUser } from "@/service/auth"
import { userSessionStorage } from "@/service/userSessionStorage"
import { getUserFromDBById } from "@/service/db-service"

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  async function addUserDataFromDBToClient(userId: any) {
    const userData = await getUserFromDBById(userId)
    if (userData) {
      return userData.firstName
    } else {
      console.log("пользватель не найден")
    }
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()
    if (!password || !email) {
      setError("Заполните полностью email и пароль")
      return
    }

    if (!email.includes("@")) {
      setError("Введите корректный email")
      return
    }
    setError("")

    console.log("Вход выполнен")

    try {
      const loginResponse = await signInUser(email, password)
      const firstName = await addUserDataFromDBToClient(loginResponse.user.uid)
      if (firstName) {
        userSessionStorage.startSession(
          loginResponse.user
        )
      }
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
          <h3>Войти</h3>
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
            <p>
              У вас нету аккаунта?
              <Link to="/registration" state={{ background: location }}>
                <span>Зарегистрироваться</span>{" "}
              </Link>
            </p>
            <Button onClick={undefined} variant={"loginAuth"}>
              Войти
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { LoginPage }
