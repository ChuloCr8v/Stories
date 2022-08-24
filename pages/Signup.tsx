import {FC, useState, useEffect} from 'react'
import {Input, Button } from '../components'
import styles from '../styles/Signup.module.scss'
import {auth, db} from '../constants/firebase'
import {Toast} from '../components'
import {FaTimes, FaCheck, FaBomb} from 'react-icons/fa'
import Link from 'next/link'
import { doc, setDoc } from "firebase/firestore"; 
import {signup, authenticatedUser} from '../constants/UserAuth'
import Spinner from '../components/Spinner'
import {motion} from 'framer-motion'


const Signup :FC = (props) => {
  
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [user, setUser] = useState<any>(null)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [showWarning, setShowWarning] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  
  const setShowSignup = props.setShowSignup
  
  const confirmSignup = () => {
     signup(fullName, email, username, password, setShowWarning, setShowToast, setUser, doc, setDoc, db, setLoading, setShowSignup)
  }
  
  const showLoginForm = () => {
    props.setShowForm(true)
    props.setShowSignup(false)
  }
  return(
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.1 }} 
      className={styles.login}>
  <div className={styles.container} >
     {showToast ? <Toast msg={user ? "You have signed up successfully" : "error, unable to sign you up. Please try one more time"} closeIcon=<FaTimes className={styles.close_icon} onClick={() => setShowToast(false)} /> icon={user ? <FaCheck className={styles.icon} /> : <FaTimes className={styles.icon} />}  /> : ''} 
      {showWarning ? <Toast msg={"Please Fill In All Credentials!"} icon={<FaBomb className={styles.icon} />} closeIcon={<FaTimes className={styles.close_icon} onClick={() => setShowWarning(false)} />} /> : ''}  
      <div className={styles.wrapper}> 
      <div className={styles.form} >
       <div className={styles.form_group}>
        <label htmlFor="Name">Full Name</label>
        <Input placeholder="Enter Full Name" type="text" onChange={(e) => setFullName(e.target.value)} value={fullName} />
       </div>
       <div className={styles.form_group}>
        <label htmlFor="username">Username</label>
        <Input placeholder="Pick a unique username" type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
       </div>
       <div className={styles.form_group}>
        <label htmlFor="email">Email</label>
        <Input placeholder="Enter Valid Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
       </div>
       <div className={styles.form_group}>
        <label htmlFor="password">Password</label>
        <Input placeholder={"Choose Password"} type={"password"} onChange={(e) => setPassword(e.target.value)} value={password} />
       </div>
       <div className={styles.btn_wrapper}>
         {loading ? <Spinner /> : <Button text={"Signup"} onClick={confirmSignup} />} 
          <Button bg={'#fff'} color={'red'} text={'Cancel'} onClick={() => props.setShowSignup(false)} />
       </div>
       <p className={styles.login_url}>Have an account? <span className={styles.url} onClick={showLoginForm}>Login here
            </span></p>
      </div>
    </div>
    </div>
    </motion.div>
    )
}

export default Signup