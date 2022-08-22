import {FC, useState, useEffect } from 'react'
import styles from '../styles/Header.module.scss'
import {FaBars, FaUser} from 'react-icons/fa'
import Link from 'next/link'
import {auth} from '../constants/firebase'
import Login from '../pages/Login'
import Router from 'next/router'

interface Props {
  setShowMenu: () => void 
}
const Header: FC <Props> = (props) => {
  const [user, setUser] = useState<any>(null)
  const [showForm, setShowForm] = useState<any>(false)
  
   const getUser = auth.currentUser
  
   useEffect(() => {
     setUser(getUser)
   }, [])
   
   const handleUserDash = () => {
     if(user !== null) {
       Router.push('/dashboard')
       return
     }
     
     setShowForm(!showForm)
   }
  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {showForm ? <Login showForm={showForm} setShowForm={setShowForm} /> : ''} 
            <Link href="/" >
              <a className={styles.logo_wrapper}>
                <h1 className={styles.logo}>Poet<span>eet</span></h1>
              </a>
            </Link>
            <div className={styles.menu_icon_wrapper}>
                <div className={styles.avatar_wrapper} onClick={handleUserDash} >
                  <FaUser className={styles.avatar} />
                </div>
               <FaBars onClick={() => props.setShowMenu(!props.showMenu)} className={styles.menu_icon} /> 
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header 