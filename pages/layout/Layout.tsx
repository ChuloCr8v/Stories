import {FC, useState, useEffect} from 'react'
import Menu from '../../components/Menu'
import Header from '../../components/Header'
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
        {children}
      {user ? <Menu bottom={showMenu ? 0 : '-200%'} /> : ''} 
    </div>
  );
};

export default Layout;