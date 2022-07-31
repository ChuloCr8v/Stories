import {FC} from 'react'
import styles from '../styles/Loading.module.scss'
import {FaPenFancy} from 'react-icons/fa'

interface Props {
  title: string
}

const Loading : FC <Props> = (props) => {
  return (
     <div className={styles.container}>
     <div className={styles.wrapper}>
       <div className={styles.bg_two}>
         <div className={styles.bg_one}>
         </div>
       </div>
       </div>
     </div>
   )
}

export default Loading