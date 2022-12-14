import {auth} from './firebase'
import Router from 'next/router'
import { getDocs, query, where,  doc, setDoc, collection} from "firebase/firestore"; 
interface Props {
  fullName: string
  email: string
  username: string
  password: string
  setUser: () => void
  setShowToast: () => void
  setShowWarning: () => void
  setLoading: () => void
  db: any
  doc: any
  setDoc: any
}



 const signup: FC <Props> = async (fullName, email, username, password, setShowWarning, setShowToast, setUser, doc, setDoc, db, setLoading, setShowSignup) => {
    setShowWarning(false)
    setShowToast(false)
    if (fullName && email && password && username) {
      setLoading(true)
      try {
        const q = query(
          collection(db, "users"), 
          where("username", "==", `${username}`)
      );
      const querySnapshot = await getDocs(q);
      const arr = []
      const verifyUsername = querySnapshot.forEach(data => {arr.push(data.data().username)} )
      if ( arr.includes(`${username}`)) {
        alert('OOPS! Username already exists. Pick a new one') 
        return setLoading(false)
      } 
      
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const _user = res.user;
    setUser(_user)
    await setDoc(doc(db, "users", `${_user.uid}`), {fullName, email, username, password
    }, {merge: true} ); 
    setLoading(false)
    setShowToast(true) 
    setTimeout(() => {
      setShowToast(false)
      //Router.push('/Login')
      setShowSignup(false)
    }, 2000)
  } catch (err) {
    console.error(err);
    setShowToast(true)
     setShowToast(true) 
    setTimeout(() => {
      setShowToast(false)
      //Router.push('/Login')
    }, 3000)
    setLoading(false)
  } 
    } else {
      setShowWarning(true)
    } 
  }


/* const authenticatedUser: FC<Props> = ({setLoading, setUser}) => {
   
    auth.onAuthStateChanged((_user) => {
      if (_user) {
        {setUser(_user)} 
        {setLoading(false)} 
      } else {
        {setUser(null)}
        {setLoading(false)} 
      }
    });
 } */

//export {authenticatedUser} 
export {signup} 