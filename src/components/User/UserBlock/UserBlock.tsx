import styles from "./UserBlock.module.scss"
import { Link } from "react-router-dom"
const UserBlock = ({ first_Name }: any) => {
  const firstName = first_Name

  return (
    <div className={styles.root}>
      <div className={styles.roundIcon}>{firstName ? firstName[0] : null}</div>
      <p className={styles.userName}>{firstName}</p>
      <Link to="account">
        <div className={styles.userTab}>Личный кабинет</div>
      </Link>
      <Link to="orders">
        <div className={styles.userTab}>История заказов</div>
      </Link>
    </div>
  )
}

export { UserBlock }
