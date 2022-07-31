import {FC, useState, useEffect} from 'react'
import Menu from '../../components/Menu'
import styles from '../../styles/Layout.module.scss'
import {authenticatedUser} from '../../constants/UserAuth'
const Layout: FC = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    authenticatedUser({setUser})
  }, [])
  
  return (
    <div className={styles.layout}>
        {children}
      {user ? <Menu /> : ''} 
    </div>
  );
};

export default Layout;