import {FC, useState, useEffect} from 'react'
import styles from '../styles/Story.module.scss'
import {FaThumbsUp, FaEye} from 'react-icons/fa'
import {auth, db} from '../constants/firebase'
import firebase from "firebase/compat/app";
import { getFirestore, arrayRemove, arrayUnion, deleteField, writeBatch, doc, updateDoc, getDoc } from "firebase/firestore";
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
  
  useEffect(() => {
    getLikes()
  }, [])
  
  
  
  const handleLike = async () => {
      setLoading(true)
    try {
       const docRef = doc(db, "posts", `${props.postId}`);
       const docSnap = await getDoc(docRef);
       
       if (docSnap.data().likes.includes(props.username)){
         await updateDoc(docRef, {
          likes: firebase.firestore.FieldValue.arrayRemove(`${props.username}`)
          });
           getLikes()
       } else {
          await updateDoc(docRef, {
          likes: firebase.firestore.FieldValue .arrayUnion(`${props.username}`)
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
       <h2 className={styles.title}>{props.title} </h2>
       <p className={styles.name}><span>By: </span>{props.username} </p>
       <p className={styles.story}>{props.story} </p>
     <div className={styles.stats_wrapper}>
     <div className={styles.stat}>
        {loading ? <Spinner /> : <FaThumbsUp className={styles.icon} id={styles.like_icon} onClick={handleLike} style={{color: likes.includes(props.username) ? '#000000' : '#d9d9d9'} }/>} 
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