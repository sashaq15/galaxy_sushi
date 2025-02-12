import { db } from '../firebase'
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";


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

export async function addUserOrdersToDB( id:string, data: object) {
  try {
    const docRef = doc(db, 'orders', id)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      await updateDoc(docRef, {
        orders: arrayUnion(data)
      })
      } 
  else {
      await setDoc(docRef, {
        orders: arrayUnion(data)
      })
      }
  } catch(e) {
    console.error(`Error adding document with id: ${id}', ${e}`)
  }
}

export async function getUserOrderFromDBById(id: string) {
  try {
    const docRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docRef);

    const userData = {...docSnap.data()}
    const userDataArr = userData.orders.map((item:any) => ({
      date: item.date,
      items: item.items
    }))
    return userDataArr;
  } catch (e) {
    console.error('Ошибка при получении документа', e)
  }
}

