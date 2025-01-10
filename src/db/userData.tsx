import { db } from '../firebase'
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";


export async function addUserToDB(email:string, firstName:string, id:string) {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      email: email,
      firstName: firstName,
      id: id
    })
  } catch(e) {
    console.error('Error adding document:', e)
  }
}

export async function getUserFromDBById(id: string) {
  try {
    const q = query(collection(db, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Такого пользователя не существует');
      return null;
    }

    const userData  =  querySnapshot.docs.map(doc => ({
      ...doc.data() 
    }));

    return userData[0]; 
  } catch (e) {
    console.error('Ошибка при получении документа:', e);
    return null; 
  }
}

export async function getSushiFromDBById(id: number) {
  try {
    const q = query(collection(db, "sushi"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Такого продукта не сущесвует');
      return null;
    }

    const sushiData  =  querySnapshot.docs.map(doc => ({
      ...doc.data() 
    }));

    return sushiData[0]; 
  } catch (e) {
    console.error('Ошибка при получении документа:', e);
    return null; 
  }
}


