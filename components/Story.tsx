import {FC, useState, useEffect} from 'react'
import styles from '../styles/Story.module.scss'
import {FaThumbsUp, FaEye} from 'react-icons/fa'
import {auth, db} from '../constants/firebase'
import firebase from "firebase/compat/app";
import { getFirestore, arrayRemove, arrayUnion, deleteField, writeBatch, doc, updateDoc, getDoc } from "firebase/firestore";
import {fetchUsers} from '../constants/methods'

import Spinner from './Spinner'

interface Props {
  title: string 
  story: string
  posterName: string
  username: string
  likes: any 
  views: any
  postId: number
  fetchApprovedStories: () => void
  setApprovedStories: () => void
  approvedStories: () => void
}


const Story : FC <Props> = (props) => {
  
  const [likes, setLikes] = useState<any>([])
  const [liked, setLiked] = useState<any>(false)
  const [loading, setLoading] = useState<any>(false)
  const [users, setUsers] = useState<any>([])
  const [user, setUser] = useState<any>('')
  const _user = auth.currentUser
  
  const getLikes = async () => {
    const docRef = doc(db, "posts", `${props.postId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
       setLikes(docSnap.data().likes)
       
    } else {
      // doc.data() will be undefined in this case
     console.log("No such document!");
    }
  }
  
  const getUser = () => {
    
     const arr = []
     users.forEach((doc) => {
      arr.push(doc.data())
    })
     const filteredUser = arr.filter((user_) => user_.email.toLowerCase()  === _user.email.toLowerCase())
    filteredUser.map((filtered) => {
      setUser(filtered.username)
    })
  }
  
  useEffect(() => {
    fetchUsers(setUsers)
    getUser() 
    console.log(444)
  }, [])
  
    setTimeout(() => {
      getUser()
    }, 1000)
    
  useEffect(() => {
    getLikes()
  }, [])
  
  
   const handleLike = async () => {
     getUser()
    console.log(user)
    setLoading(true)
    try {
       const docRef = doc(db, "posts", `${props.postId}`);
       const docSnap = await getDoc(docRef);
       if (docSnap.data().likes.includes(user)){
         await updateDoc(docRef, {
          likes: firebase.firestore.FieldValue.arrayRemove(`${user}`)
          });
           getLikes()
       } else {
          await updateDoc(docRef, {
          likes: firebase.firestore.FieldValue .arrayUnion(`${user}`)
          }); 
          getLikes()
       } 
        
    } catch(e) {
       console.log(e)
    } 
    setLoading(false) 
  }
  
  
  return (
     <div className={styles.wrapper}>
        welcome {user} 
       <h2 className={styles.title}>{props.title} </h2>
       <p className={styles.name}><span>By: </span>{props.username || props.posterName} </p>
       <p className={styles.story}>{props.story} </p>
     <div className={styles.stats_wrapper}>
     <div className={styles.stat}>
        {loading ? <Spinner /> : <FaThumbsUp className={styles.icon} id={styles.like_icon} onClick={handleLike} style={{color: likes.includes(user) ? '#000000' : '#d9d9d9'} }/>} 
       {loading ? '' : <p className={styles.likers}>{likes.length > 1 ? `${likes.slice(-1)} and ${likes.length - 1} others` : likes} </p>} 
     </div>
     <div className={styles.stat}>
      <FaEye className={styles.icon} />
      <p className={styles.likers}>{props.views}</p>
     </div>
     </div>
     </div>
    )
}

export default Story 