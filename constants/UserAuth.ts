import {auth} from './firebase'
import Router from 'next/router'
import { doc, setDoc, collection, getDocs} from "firebase/firestore"; 

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



 const signup: FC <Props> = async (fullName, email, username, password, setShowWarning, setShowToast, setUser, doc, setDoc, db, setLoading) => {
    setShowWarning(false)
    setShowToast(false)
    
    if (fullName && email && password && username) {
      try {
        
        const querySnapshot = await getDocs(collection(db, 'users'))
        querySnapshot.forEach((doc) => {
            const result = doc.data().username === username
            if(result){
              alert(`${username} already exists`)
            }
            return
        })
      
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const _user = res.user;
    setUser(_user)
    setShowToast(true)
    await setDoc(doc(db, "users", `${_user.uid}`), {fullName, email, username, password
    }, {merge: true} ); 
    Router.push('/MainNav')
  } catch (err) {
    console.error(err);
    setShowToast(true)
  } 
    } else {
      setShowWarning(true)
    } 
  }


 const authenticatedUser: FC<Props> = ({setLoading, setUser}) => {
   
    auth.onAuthStateChanged((_user) => {
      if (_user) {
        {setUser(_user)} 
        {setLoading(false)} 
      } else {
        {setUser(null)}
        {setLoading(false)} 
      }
    });
 }

export {authenticatedUser} 
export {signup} 