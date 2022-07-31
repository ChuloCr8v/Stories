import {FC} from 'react'
import styles from '../styles/Toast.module.scss'
interface Props {
  icon: any
  msg: string
 closeIcon: any
}

const Toast : FC <Props> = (props) => {
  return (
     <div className={styles.toast}>
     <div className={styles.container}>
       {props.closeIcon} 
       {props.icon} 
       <p className={styles.message}>{props.msg}</p>
     </div>
     </div>
   )
}

export default Toast 