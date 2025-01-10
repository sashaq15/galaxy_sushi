import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, setDoc, runTransaction, query, orderBy, limit, where} from "firebase/firestore";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKCV_6TRQilDFSXG-6PEv9WJsgN0grVJI",
  authDomain: "react-firebase-auth-c7697.firebaseapp.com",
  projectId: "react-firebase-auth-c7697",
  storageBucket: "react-firebase-auth-c7697.firebasestorage.app",
  messagingSenderId: "387149431091",
  appId: "1:387149431091:web:8ed34b4b6fd03bb92a3e46",
  measurementId: "G-9PZXSHRR7Q"
}

const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app);
export const createUser = async(email:string, password:string) => {
    return createUserWithEmailAndPassword(getAuth(app), email,password)
  }
  
  export const signInUser = async(email:string, password:string) => {
    return signInWithEmailAndPassword(getAuth(app), email, password )
  }

 export async function addUserToDB(email:string, firstName:string, id:string) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        email: email,
        firstName: firstName,
        id: id
      })
      console.log('Document written with ID :', docRef.id);
    } catch(e) {
      console.error('Error adding document:', e)
    }
  }

/* //get docData from db(ref doc)
const nameRef = doc(db, 'users/B8N7QTeYO0gdLotwSqYR');
const nameSnapShot = (await getDoc(nameRef)).data();


//get docsData frod db(ref collection)
const usersRef = collection(db, 'users');
const q = query(usersRef, where ('email', '==', 'zalypa'))
const querySnapShot = await getDocs(q);
querySnapShot.forEach((doc) => {
  console.log(doc.data())
})

 */

/* export async function editUserData(docItem:any) {
  await setDoc(doc(db, 'users', docItem), {
    email: 'Подзалупный творог',
    firstName: 'Залупенко3000',
    id: '12345'
  }
)
console.log(docItem, 'перезаписан');
}



export async function editUserDataTranscation(docRef:any) {
  try {
  await runTransaction(db, async (transaction) => {
    const sfDoc = await transaction.get(nameRef);
    if(!sfDoc.exists()) {
      throw "Document does not exists"
    }
    const newUserData = {email: 'zalypa', firstName: 'RoadMap', id : '111111'};
    transaction.update(nameRef, newUserData)
  })
  console.log('Transaction succefuly commited')
  } catch (e) {
    console.log('Transaction failed:', e)
  }

} */


/* const sushiRef = collection(db, 'sushi');
const q = query(sushiRef)
const querySnapShot = await getDocs(q);
const arr:any = []
querySnapShot.forEach((doc) => {
  arr.push(doc.data())})

console.log(arr);
   */