import {FC, useState, useEffect} from 'react'
import {fetchUser} from '../constants/methods'
import UserDash from '../components/UserDash'
import styles from '../styles/dashboard.module.scss'
import Link from 'next/link'

const dashboard: FC = () => {
  const [user, setUser] = useState<any>('')
  const [menuData, setMenuData] = useState<any>('Home')
  
  
  useEffect(() => {
    fetchUser(setUser)
  }, [])
  
  return (
      <div className={styles.user_dash}>
      <div className={styles.container}>
  {/*      <div className={styles.welcome_message_wrapper}>
          
          <p className={styles.prompt}>Are we <Link href="/latest-stories"><a className={styles.prompt_link}>Reading </a></Link> or <Link href="/NewPost"><a className={styles.prompt_link}>writing</a></Link> today? </p>
        </div>*/} 
        <div className={styles.container}>
             <div className={styles.dash_menu}>
               <p className={styles.dash_menu_item} onClick={() => setMenuData('Home')} style={{color: `${menuData === 'Home' ? 'teal' : '#000'}`}} >Home</p>
               <p className={styles.dash_menu_item} onClick={() => setMenuData('About')} >About</p>
             </div>
          <div className={styles.wrapper}>
             {menuData === 'Home' ? <UserDash /> : ''} 
             {menuData === 'About' ? 'About Section' : ''} 
          </div>
        </div>
        </div>
      </div>
    )
}

export default dashboard