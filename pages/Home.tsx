import {FC} from 'react'
import {Button} from '../components'
import styles from '../styles/Home.module.scss'
import { getAuth } from "firebase/auth";
import TextEditor from '../components/TextEditor'
const Home : FC = () => {
  const auth = getAuth()
  const signout = async () => {
    try {
      auth.signOut()
    } catch (e) {
      alert(e)
    }
  }
  return (
      <div className={styles.home}>
        <TextEditor />
        <Button text="Sign Out" onClick={signout} />
      </div>
   ) 
}

export default Home