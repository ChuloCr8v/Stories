import {FC} from 'react'
import styles from '../styles/UserDash.module.scss'
import UserPosts from '../components/UserPosts'

const UserDash: FC = (props) => {
  return (
      <div className={styles.user_dash}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
             <UserPosts email={props.email} />
          </div>
        </div>
      </div>
    )
}

export default UserDash