import {FC} from 'react'
import {Button} from '../components'
import styles from '../styles/Home.module.scss'
import { getAuth } from "firebase/auth";
import TextEditor from '../components/TextEditor'
import Router from 'next/router'
const Home : FC = () => {
  const auth = getAuth()
  const signout = async () => {
    try {
      auth.signOut()
      Router.push('/MainNav')
    } catch (e) {
      alert(e)
    }
  }
  return (
      <div className={styles.home}>
        <Button text="Sign Out" onClick={signout} />
      </div>
   ) 
}

export default Home