import {FC} from 'react'
import styles from '../styles/Header.module.scss'
import {FaBars, FaUser} from 'react-icons/fa'
import Link from 'next/link'

interface Props {
  setShowMenu: () => void 
}
const Header: FC <Props> = (props) => {
  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <Link href="/" >
              <a className={styles.logo_wrapper}>
                <h1 className={styles.logo}>Poet<span>eet</span></h1>
              </a>
            </Link>
            <div className={styles.menu_icon_wrapper}>
              <Link href="/dashboard">
                <a className={styles.avatar_wrapper}>
                 <FaUser className={styles.avatar} />
                </a>
              </Link>
               <FaBars onClick={() => props.setShowMenu(!props.showMenu)} className={styles.menu_icon} /> 
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header 