import {FC, useState, useEffect } from 'react'
import styles from '../styles/Header.module.scss'
import {FaBars, FaBell} from 'react-icons/fa'
import Link from 'next/link'
import {auth} from '../constants/firebase'
import Router from 'next/router'

interface Props {
  setShowMenu: () => void 
}

const Header: FC <Props> = (props) => {

 const user = auth.currentUser
   
  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <Link href="/" >
              <a className={styles.logo_wrapper}>
                <h1 className={styles.logo}>Poet<span>eet</span></h1>
              </a>
            </Link>
            <div className={styles.menu_icon_wrapper}>
             <FaBell className={styles.icon} id={styles.notify_icon} />
             <FaBars onClick={() => props.setShowMenu(!props.showMenu)} className={styles.menu_icon} /> 
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header 