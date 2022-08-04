import {FC, useState, useEffect} from 'react'
import Home from './Home'
import Login from './Login'
import styles from '../styles/MainNav.module.scss'
import Loading from '../components/Loading'
import {auth} from '../constants/firebase'

const MainNav : FC = () => {
  const [user, setUser] = useState<any>(null)  
  const [loading, setLoading] = useState<boolean>(true)

const authenticatedUser = () => {
  setLoading(true)
  const _user = auth.currentUser 
  if(_user){
    setUser(_user)
    setLoading(false)
  } else {
    setUser(null)
    setLoading(false)
  }
}
useEffect(() => {
  authenticatedUser()
}, [])
 
  return(
    <>
   {loading ? <Loading title={"Fetching Your Stories..."} /> : <div className={styles.main_nav}>
    {user ? <Home /> : <Login />} 
   </div>} 
   </>
    )
}

export default MainNav