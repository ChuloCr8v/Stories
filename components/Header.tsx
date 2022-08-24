import {FC, useState, useEffect } from 'react'
import styles from '../styles/Header.module.scss'
import {FaBars, FaUser, FaSignInAlt} from 'react-icons/fa'
import Link from 'next/link'
import {auth} from '../constants/firebase'
import Login from './Login'
import Signup from '../pages/Signup'
import Router from 'next/router'

interface Props {
  setShowMenu: () => void 
}
const Header: FC <Props> = (props) => {
  const [showForm, setShowForm] = useState<any>(false)
  const [showSignUp, setShowSignup] = useState<any>(false)
  
   const user = auth.currentUser
   
  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {showForm ? <Login setShowForm={setShowForm} showForm={showForm} showSignUp={showSignUp} setShowSignup={setShowSignup} /> : ''} 
            {showSignUp ? <Signup setShowForm={setShowForm} showForm={showForm} showSignUp={showSignUp} setShowSignup={setShowSignup} /> : ''} 
            <Link href="/" >
              <a className={styles.logo_wrapper}>
                <h1 className={styles.logo}>Poet<span>eet</span></h1>
              </a>
            </Link>
            <div className={styles.menu_icon_wrapper}>
              {user ? 
                <Link href="dashboard">
                  <a className={styles.icon_wrapper}>
                    <FaUser className={styles.icon} />
                  </a>
                </Link> : 
                  <div className={styles.icon_wrapper}>
                    <FaSignInAlt className={styles.icon} onClick={() => setShowForm(!showForm)} />
                  </div>
               } 
               <FaBars onClick={() => props.setShowMenu(!props.showMenu)} className={styles.menu_icon} /> 
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header 