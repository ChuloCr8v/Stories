import {FC} from 'react'
import styles from '../styles/UserDash.module.scss'
const UserDash: FC = () => {
  return (
      <div className={styles.user_dash}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
             user Dashboard 
          </div>
        </div>
      </div>
    )
}

export default UserDash