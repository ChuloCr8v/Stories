import styles from '../styles/Reply.module.scss'
import {FC} from 'react'

const Reply : FC <Props> = (props) => {
  return(
      <div className={styles.reply}>
        <p className={styles.username}>{props.username}</p>
        <p className={styles.reply_body}>{props.reply}</p>
        <p className={styles.likes}>{props.likes.length}</p>
      </div>
    )
}

export default Reply 