import { db } from "../../firebaseConfig"
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore"


export async function getUserFromDBById(id: string) {
    try {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        console.log('Такого пользователя не существует');
        return null;
      }
  
      const userData = {...docSnap.data()}
      return userData
    } catch (e) {
      console.error('Ошибка при получении документа', e)
    }
  }
  

  export async function addUserToDB(email:string, firstName:string, id:string) {
    try {
      const docRef = doc(db, 'users', id)
  
      await setDoc(docRef, {
        email: email,
        firstName: firstName,
        id: id
      });
    } catch(e) {
      console.error(`Error adding document with id: ${id}', ${e}`)
    }
  }