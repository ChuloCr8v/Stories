
import TextArea from './Textarea'
import Input from './Input'
import Button from './Button'
import Toast from './Toast'
import styles from '../styles/WritePost.module.scss'
import {useState, useEffect, FC} from 'react'
import {sendPost} from '../constants/methods'
import {FaBomb} from 'react-icons/fa'
import Loading from './Loading'
import {auth} from '../constants/firebase'
import { query, where, doc, setDoc, collection, getDocs} from "firebase/firestore"; 
import {db} from '../constants/firebase'

const WritePost : FC <Props> = (props) => {
  
  const [title, setTitle] = useState<string>('')
  const [post, setPost] = useState<string>('')
  const [confirmPost, setConfirmPost] = useState<boolean>(false)
  const [showWarning, setShowWarning] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<string>('')
  const [posterName, setPosterName] = useState<any>(null )
  const [posterEmail, setPosterEmail] = useState<any>('')
  
  const postId = Date.now()
  
    const confirmNewPost = (title, post)  => {
    if(!title || !post ){
      setShowWarning(true)
      setTimeout(() => {
        setShowWarning(false)
      }, 2000);
    } else {
      setConfirmPost(true)
    } 
    }
    
    const confirm = async () => {
        sendPost({title, post, loading, setLoading, setConfirmPost, setTitle, setPost, postId, posterName, posterEmail})
   
    }
    
   useEffect(() => {
     const _user = auth.currentUser
     setUser(_user)
   }, [])
   
    
    useEffect(() => {
      const set = async () => {
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
         setPosterName(doc.data().fullName)
         setPosterEmail(doc.data().email)
         
      });
      } 
      
      set()
     
    }, [user])
      
    
   
 
  return (
    <div className={styles.write_post}>
    {loading ? <Loading /> : ''} 
    <div className={styles.container}>
      {showWarning ? <Toast icon={'😢'} msg={"Please Tell Your Story"} /> : ''} 
      <div className={styles.wrapper}> 
      <div className={styles.form}>
        <input className={styles.post_title} type='text' value={title} onChange={(e) => {setTitle(e.target.value); setShowWarning(false)}} placeholder='Enter Title' />
        <TextArea value={post} onChange={(e) => setPost(e.target.value)}/>
        <Button text={'Submit'} onClick = {() => confirmNewPost(title, post)} />
      </div >
    </div>
    {confirmPost ? 
      <div className={styles.confirm_post_wrapper}>
      <div className={styles.confirm_post}>
        <p className={styles.confirm_post_text}>Confirm you want to send this post</p>
         <div className={styles.form}>
        <input className={styles.post_title} type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
        <TextArea onChange={(e) => setPost(e.target.value)} value={post}/>
      </div >
        <div className={styles.btn_container}>
          <Button text={"Send"} onClick={confirm} />
          <Button text={"wait"} onClick={() => setConfirmPost(false)} />
        </div>
        </div>
      </div>
    : ''}
    </div>
    </div>
  )
}

export default WritePost 