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
        <p className={styles.reply_body}>{props.reply}</p> <div className={styles.reactions_wrapper}>
        <div className={styles.input_wrapper}>
          <input
            type="text"
            className={styles.reply_input}
            placeholder="leave a reply"
            onChange={(e) => props.setReply(e.target.value)} 
          />
          <FaPaperPlane className={styles.send_icon} onClick={props.handleReply} />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.likes_wrapper}>
            <FaThumbsUp onClick={handleLike} className={styles.likel_icon} style={{color: props.likes.includes(user.username) ? '#000' : 'lightgray'}} />
            <span> {props.likes.length} likes</span>
          </div>
        )}
      </div>
       
      </div>
    )
}

export default Reply 