import {FC, useState, useEffect} from 'react'
import Home from './Home'
import Login from './Login'
import styles from '../styles/MainNav.module.scss'
import {authenticatedUser} from '../constants/UserAuth'
import Loading from '../components/Loading'

const MainNav : FC = () => {
  const [user, setUser] = useState<any>(null)  
  const [loading, setLoading] = useState<boolean>(true)

useEffect(() => {
  authenticatedUser({setUser, setLoading})
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