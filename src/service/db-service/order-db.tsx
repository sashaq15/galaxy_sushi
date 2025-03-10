import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import {db} from '@/firebaseConfig'

export async function addUserOrdersToDB(id: string, data: object) {
  try {
    const docRef = doc(db, "orders", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        orders: arrayUnion(data)
      })
    } else {
      await setDoc(docRef, {
        orders: arrayUnion(data)
      })
    }
  } catch (e) {
    console.error(`Error adding document with id: ${id}', ${e}`)
  }
}

export async function getUserOrderFromDBById(id: string) {
  try {
    const docRef = doc(db, "orders", id)
    const docSnap = await getDoc(docRef)

    const userData = { ...docSnap.data() }
    const userDataArr = userData.orders.map((item: any) => ({
      date: item.date,
      items: item.items
    }))
    return userDataArr
  } catch (e) {
    console.error("Ошибка при получении документа", e)
  }
}