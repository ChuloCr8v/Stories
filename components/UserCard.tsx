import { FC, useState, useEffect } from "react";
import {auth} from '../constants/firebase'
import styles from '../styles/UserCard.module.scss'
import Link from 'next/link'
import {fetchUser} from '../constants/methods'

const UserCard: FC<Props> = (props) => {
  const [loading, setLoading] = useState<any>(false);
  const [users, setUsers] = useState<any>([]);
  const [user, setUser] = useState<any>("");
  const [day, setDay] = useState<any>("");
  const [time, setTime] = useState<any>("");
  const _user = auth.currentUser;
  
  
  useEffect(() => {
    fetchUser(setUser)
  }, [_user])
  
  setTimeout(() => {
   const date = Date.now()
   setTime(new Date(date).toLocaleTimeString()) 
   setDay(new Date(date).toLocaleDateString())
  }, 1000)
  
 
  return (
    <div className={styles.user_card}>
      <div className={styles.container}>
        <div className={styles.welcome_message_wrapper}>
          <h2 className={styles.welcome_message}>Hello <span>{_user ? user.username : 'Guest'}</span></h2>
        </div>
        <nav className={styles.user_menu}>
          <div className={styles.user_menu_item}>
            <p> Trending </p>
          </div>
          {/* <div className={styles.user_menu_item}>
            <p> Following </p>
          </div> */} 
          <div className={styles.user_menu_item}>
            <p> Latest </p>
          </div>
          <div className={styles.user_menu_item}>
            <p> Top Writers </p>
          </div>
        </nav>
        <div className={styles.clock}>
          <p className={styles.day}>{day} </p>
          <p className={styles.time}>{time} </p>
        </div> 
      </div>
    </div>
  );
};

export default UserCard;
