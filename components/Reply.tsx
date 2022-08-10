import styles from '../styles/Reply.module.scss'
import {FC, useState, useEffect} from 'react'
import {FaThumbsUp, FaPaperPlane} from 'react-icons/fa'
import Spinner from './Spinner'
import {fetchUser} from '../constants/methods'

const Reply : FC <Props> = (props) => {
  const [loading, setLoading] = useState<any>(false)
  const [user, setUser] = useState<any>([])
  
  useEffect(() =>{
    fetchUser(setUser)
    console.log(user)
  }, [])
  
  const handleLike = async () => {return null} 
  
  return(
      <div className={styles.reply}>
        <p className={styles.username}>{props.username}</p>
        <p className={styles.reply_body}>{props.reply}</p> 
      
      </div>
    )
}

export default Reply 