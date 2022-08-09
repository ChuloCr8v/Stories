import {FC, useState, useEffect} from 'react'
import Home from './Home'
import Login from './Login'
import styles from '../styles/MainNav.module.scss'
import Spinner from '../components/Spinner'
import {auth} from '../constants/firebase'

const MainNav : FC = () => {
  const [user, setUser] = useState<any>('')  
  const [loading, setLoading] = useState<boolean>(false )

  const _user = auth.currentUser 
  
  return(
    <div>
   {loading ? <Spinner /> : <div className={styles.main_nav}>
    {_user ? <Home /> : <Login />} 
   </div>} 
   </div>
    )
}

export default MainNav