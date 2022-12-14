import {FC, useState, useEffect} from 'react'
import styles from '../styles/Menu.module.scss'
import MenuItem from './MenuItem'
import {FaHome, FaPenFancy, FaNewspaper, FaUser, FaSignInAlt} from 'react-icons/fa'
import { useRouter } from 'next/router'
import {auth} from '../constants/firebase'
import Link from 'next/link'
import Login from './Login'
import Signup from '../pages/Signup'
import {fetchUserProfile} from '../constants/methods'

interface Props {
  bottom: any
}


const Menu: FC <Props> = (props) => {
 const [showForm, setShowForm] = useState<any>(false)
  const [showSignUp, setShowSignup] = useState<any>(false)
  const [userProfileDetails, setUserProfileDetails] = useState<[]>([])
  
  const user = auth.currentUser 
  const router = useRouter()
  const href = router.asPath
 
  const username = userProfileDetails.map(profile => profile.username)
  const posterEmail = userProfileDetails.map(profile => profile.email)
  
  useEffect(() => {
    user ? fetchUserProfile({setUserProfileDetails, userEmail: user.email}) : ''
  }, [user])
  
  const checkLoginStatus = () => {
    if (!user) {
      alert('Please login to write posts')
      return
    }
  }
  
  return (
      <div className={styles.menu} style={{bottom: props.bottom}} >
                    {showForm ? <Login setShowForm={setShowForm} showForm={showForm} showSignUp={showSignUp} setShowSignup={setShowSignup} /> : ''} 
            {showSignUp ? <Signup setShowForm={setShowForm} showForm={showForm} showSignUp={showSignUp} setShowSignup={setShowSignup} /> : ''} 
        <MenuItem 
          title={"Home"} 
          titleColor={href === `/` ? '#000' : 'gray'} 
          url={"/"} 
          icon={
            <FaHome className={styles.icon} 
              style={{color: href === `/` ? '#000' : 'gray'}} 
            />
          } 
        />
        <MenuItem 
          title={"Latest"} 
          titleColor={href === `/latest-stories` ? '#000' : 'gray'} 
          url={"/latest-stories"} 
          icon={
            <FaNewspaper className={styles.icon} style={{color: href === `/latest-stories` ? '#000' : 'gray'}} 
            />
          } 
        />
        {user ? <div className={styles.write_icon_wrapper}
        >
          <MenuItem 
            title={"Write"} 
            titleColor={href === `/NewPost` ? 'yellow' : 'white'} 
            url={"/NewPost"}  
            icon={
              <FaPenFancy className={styles.icon} style={{color: href === `/NewPost` ? 'yellow' : '#fff'}} />} id={styles.write_menu_item
            } 
           />
        </div> : ''} 
        {user ? 
             <Link 
              href={{
                pathname: "/user/[user]", 
                query: {
                  user: username, 
                  id: username, 
                  posterEmail: posterEmail, 
                }, 
              }} 
            >
                <a className={styles.icon_wrapper} style={{color: showForm ? '#000' : 'gray'}}>
                  <FaUser className={styles.icon} style={{color: showForm ? '#000' : 'gray'}} />
                </a>
             </Link> : 
             <div className={styles.icon_wrapper}>
              <FaSignInAlt className={styles.icon} onClick={() => setShowForm(!showForm)} style={{color: showForm ? '#000' : 'gray'}} />
             </div>
          } 
      </div>
    )
}

export default Menu

