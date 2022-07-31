import {FC, useState, useEffect} from 'react'
import styles from '../styles/Story.module.scss'
import {FaThumbsUp, FaEye} from 'react-icons/fa'
import {auth, db} from '../constants/firebase'
import firebase from "firebase/compat/app";
import { getFirestore, arrayRemove, arrayUnion, deleteField, writeBatch, doc, updateDoc, getDoc } from "firebase/firestore";

interface Props {
  title: string 
  story: string
  posterName: string
  likes: any 
  views: any
  postId: number
  fetchApprovedStories: () => void
  setApprovedStories: () => void
  approvedStories: () => void
}


const Story : FC <Props> = (props) => {
  
  const [likes, setLikes] = useState<any>([])
  
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
    try {
      const user = await auth.currentUser 
       const likedPost = await doc(db, "posts", `${props.postId}`);
       const docRef = doc(db, "posts", `${props.postId}`);
       const docSnap = await getDoc(docRef);
       
       if (docSnap.data().likes.includes(user.email)){
         await updateDoc(likedPost, {
          likes: firebase.firestore.FieldValue.arrayRemove(`${user.email}`)
          });
           getLikes()
       } else {
          await updateDoc(likedPost, {
          likes: firebase.firestore.FieldValue .arrayUnion(`${user.email}`)
          }); 
          getLikes()
       } 
        
    } catch(e) {
       alert(e)
    } 
  }
  
  
  return (
     <div className={styles.wrapper}>
       <h2 className={styles.title}>{props.title} </h2>
       <p className={styles.name}><span>By: </span>{props.posterName} </p>
       <p className={styles.story}>{props.story} </p>
     <div className={styles.stats_wrapper}>
     <div className={styles.stat}>
      <FaThumbsUp className={styles.icon} id={styles.like_icon} onClick={handleLike} />
      {likes.length > 1 ? `${likes.slice(-1)} and ${likes.length - 1} others` : likes} 
     </div>
     <div className={styles.stat}>
      <FaEye className={styles.icon} />
      {props.views}
     </div>
     </div>
     </div>
    )
}

export default Story 