import {FC, useState, useEffect} from 'react'
import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import UserCard from '../../components/UserCard'
import styles from '../../styles/Layout.module.scss'
import {authenticatedUser} from '../../constants/UserAuth'
const Layout: FC = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const [showMenu, setShowMenu] = useState<boolean >(false)
  
  useEffect(() => {
    authenticatedUser({setUser})
  }, [])
  
  return (
    <div className={styles.layout}>
      <Header setShowMenu={setShowMenu} showMenu={showMenu} />
      <UserCard />
        {children}
      <Menu bottom={showMenu ? 0 : '-200%'} />
      <Footer />
    </div>
  );
};

export default Layout;