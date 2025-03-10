import { collection, getDocs, query, where } from "firebase/firestore"
import {db} from '@/firebaseConfig'

export async function getSushiFromDBById(id: number) {
  try {
    const q = query(collection(db, "sushi"), where("id", "==", id))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log("Такого продукта не сущесвует")
      return null
    }

    const sushiData = querySnapshot.docs.map((doc) => ({
      ...doc.data()
    }))

    return sushiData[0]
  } catch (e) {
    console.error("Ошибка при получении документа:", e)
    return null
  }
}