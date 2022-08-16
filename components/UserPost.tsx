import {FC, useState, useEffect} from 'react'
import styles from '../styles/UserPost.module.scss'
import {FaHeart, FaCommentAlt, FaTrash} from 'react-icons/fa'
import firebase from "firebase/compat/app";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../constants/firebase";
import Link from 'next/link'
import {motion} from 'framer-motion'

interface Props {
    title: string
    body: string 
    timestamp: number 
    likes: []
  }
  
  
const UserPost : FC <Props> = (props) => {
  const [comments, setComments] = useState<any>([])
   const [confirmDeletePrompt, setConfirmDeletePrompt] = useState<boolean>(false)
  
  //Fetch comments
  const fetchComments = async () => {
    try {
      const posts = await firebase
        .firestore()
        .collection("comments")
        .where("parentPostId", "==", `${props.post.postId}`)
        .get();
      setComments([...posts.docs]);
      posts.docs.forEach((doc) => {
        setComments(doc.data().commentTitle)
      })
    } catch (e) {
      console.log(e);
       alert(e)
    }
  };
  
  
  const confirmDeletePost = () => {
    if (confirmDeletePrompt){
      setConfirmDeletePrompt(false)
    }
    setConfirmDeletePrompt(true)
  }
  
  const deletePost = async () => {
    try {
      await deleteDoc(doc(db, "posts", `${props.post.postId}`));
      setConfirmDeletePrompt(false)
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }


  
 
  return (
      <section className={styles.user_post}>
      <div className={styles.container}>
      <div className={styles.wrapper}>
      {confirmDeletePrompt ? 
      <div className={styles.prompt_wrapper}>
      <motion.div
       className={styles.delete_prompt} 
       initial={{y: 100, opacity: 0}} 
       animate={{ y: 0, opacity: 1}}
       transition={{ ease: "easeOut", duration: .1}}
      >
        <p> Are you sure you want to delete this post?</p>
        <h2 className={styles.post_title}>{props. post.title}</h2>
        <div className={styles.btn_wrapper}>
          <button className={styles.btn} onClick={() => deletePost()} >Delete</button>
          <button className={styles.btn} onClick={() => setConfirmDeletePrompt(false)} >Cancel</button>
        </div>
     </motion.div>
        </div>
      : '' }  
      <div className={styles.post_time_wrapper}>
        <p className={styles.post_time}> {new Date(props.post.timeStamp).toLocaleDateString()} </p>
      </div>
      <div className={styles.content_wrapper}>
         <Link
           href={{
             pathname: "/[id]",
             query: {
             id: props.post.postId,
             title: props.post.title,
             story: props.post.post,
             username: props.post.username,
             fullName: props.post.fullName,
             likes: props.post.likes,
           },
         }}
        >
          <a className={styles.post_title}> {props.post.title} </a>
        </Link>
        <div className={styles.reactions_wrapper}>
        <div className={styles.reaction_wrapper}>
          <FaHeart className={styles.icon} />
          <p className={styles.post_likes}> {props.post.likes.length} </p>
        </div>
        <div className={styles.reaction_wrapper}>
          <FaCommentAlt className={styles.icon} />
          <p className={styles.post_likes}> {comments.length} </p>
        </div>
        <FaTrash className={styles.icon} id={styles.delete_icon} onClick ={() => confirmDeletePost()}/>
        </div>
      </div>
      </div>
      </div>
      </section>
    )
}

export default UserPost