import {FC} from 'react'
import UserDash from '../components/UserDash'
import styles from '../styles/dashboard.module.scss'

const dashboard: FC = () => {
  return (
      <div className={styles.user_dash}>
        <h2 className={styles.welcome_message}>Welcome Pappii </h2>
        <div className={styles.container}>
          <div className={styles.wrapper}>
             <UserDash />
          </div>
        </div>
      </div>
    )
}

export default dashboard