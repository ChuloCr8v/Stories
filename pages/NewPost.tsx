
import styles from '../styles/NewPost.module.scss'
import WritePost from '../components/WritePost'
import {FC, useState, useEffect} from 'react'
import {authenticatedUser} from '../constants/UserAuth'
import MainNav from './MainNav'

const NewPost : FC = () => { 
  
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    authenticatedUser({setUser})
  }, [])
    
  return ( 
      <section className={styles.new_post}>
         {user ? <WritePost /> : <MainNav />} 
      </section>
    ); 
  }; 
  
export default NewPost 