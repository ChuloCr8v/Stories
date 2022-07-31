import {FC, useState, useEffect} from 'react'
import {Input, Button } from '../components'
import styles from '../styles/Signup.module.scss'
import {auth, db} from '../constants/firebase'
import {Toast} from '../components'
import {FaTimes, FaCheck, FaBomb} from 'react-icons/fa'
import Link from 'next/link'
import { doc, setDoc } from "firebase/firestore"; 
import {signup, authenticatedUser} from '../constants/UserAuth'

const Signup :FC = (props) => {
  
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [user, setUser] = useState<any>(null)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [showWarning, setShowWarning] = useState<boolean>(false)
  const [showLoading, setLoading] = useState<boolean>(false)
  
  return(
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
        <label htmlFor="email">Email</label>
        <Input placeholder="Enter Valid Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
       </div>
       <div className={styles.form_group}>
        <label htmlFor="password">Password</label>
        <Input placeholder={"Choose Password"} type={"password"} onChange={(e) => setPassword(e.target.value)} value={password} />
       </div>
       <Button text={"Signup"} onClick={() => signup(fullName, email, password, setShowWarning, setShowToast, setUser, doc, setDoc, db, setLoading)} />
       <p className={styles.login_url}>Have an account? <span><Link href="/Login"><a className={styles.url}>Login here </a></Link></span></p>
      </div>
    </div>
    </div>
    )
}

export default Signup