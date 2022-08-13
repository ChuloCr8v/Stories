import {FC, useState, useEffect} from 'react'
import {fetchUser} from '../constants/methods'
import UserDash from '../components/UserDash'
import styles from '../styles/dashboard.module.scss'
import Link from 'next/link'
const dashboard: FC = () => {
  const [user, setUser] = useState<any>('')
  const [time, setTime] = useState<any>('')
  const [day, setDay] = useState<any>('')
  
  
  useEffect(() => {
    fetchUser(setUser)
  }, [])
  
  setTimeout(() => {
   const date = Date.now()
   setTime(new Date(date).toLocaleTimeString()) 
   setDay(new Date(date).toLocaleDateString())
  }, 1000)
  
  return (
      <div className={styles.user_dash}>
        <div className={styles.clock}>
          <p className={styles.day}>{day} </p>
          <p className={styles.time}>{time} </p>
        </div>
        <div className={styles.welcome_message_wrapper}>
          <h2 className={styles.welcome_message}>Hello <span>{user.username}</span></h2>
          <p className={styles.prompt}>Are we <Link href="/latest-stories"><a className={styles.prompt_link}>Reading </a></Link> or <Link href="/NewPost"><a className={styles.prompt_link}>writing</a></Link> today? </p>
        </div>
        <div className={styles.container}>
          <div className={styles.wrapper}>
             <UserDash />
          </div>
        </div>
      </div>
    )
}

export default dashboard