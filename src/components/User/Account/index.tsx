import styles from './Account.module.scss'
import logoSvg from '../../../assets/logoAccount.svg'
import { useEffect, useState } from 'react'
import { getSession } from '../../../storage/session'
import { getUserOrderFromDBById } from '../../../db/userData'
const Account = () => {

  const userAuth = getSession();
  const[data,setData] = useState<any>();

     useEffect(() => {
      async function getOrders() {
          if(userAuth.id) {
              const orders:any = await getUserOrderFromDBById(userAuth.id)
              setData(orders);
              }
         }
         getOrders()
         console.log(data)
     }, [])


    let sum = 0;
    data?.forEach( (item:any) => {
      for(let i = 0; i < item.items.length; i++) {
        sum+= item.items[i].price * item.items[i].count;
      }
    })

    console.log(sum)

   
     
  return (
    <div className={styles.root}>Ваши баллы лояльности
        <br></br>
        <span>{sum}</span>
        <img src={logoSvg} alt="" />
    </div>
  )
}

export default Account;


