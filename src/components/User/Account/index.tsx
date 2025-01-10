import styles from './Account.module.scss'
import logoSvg from '../../../assets/logoAccount.svg'
const Account = () => {
  return (
    <div className={styles.root}>Ваши баллы лояльности
        <br></br>
        <span>0,00</span>
        <img src={logoSvg} alt="" />
    </div>
  )
}

export default Account;

