import styles from "./Account.module.scss"
import logoSvg from "@/assets/logoAccount.svg"
import { useEffect, useState } from "react"
import { userSessionStorage } from "@/service/userSessionStorage"
import { getUserOrderFromDBById } from "@service/db-service"
import { caclTotalPrice } from "@/utils/caclTotal"
const Account = () => {
  const userAuth = userSessionStorage.getSession()
  const [data, setData] = useState<any>()

  useEffect(() => {
    async function getOrders() {
      if (userAuth.id) {
        const orders: any = await getUserOrderFromDBById(userAuth.id)
        setData(orders)
      }
    }
    getOrders()
    console.log(data)
  }, [])

  let sum = 0
  data?.forEach((item: any) => {
    for (let i = 0; i < item.items.length; i++) {
      sum += item.items[i].price * item.items[i].count
    }
  })





  return (
    <div className={styles.root}>
      Ваши баллы лояльности
      <br></br>
      <span>{sum.toFixed(1)}</span>
      <img src={logoSvg} alt="" />
    </div>
  )
}

export { Account }
