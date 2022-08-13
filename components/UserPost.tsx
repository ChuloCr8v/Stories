import {FC, useState, useEffect} from 'react'
import styles from '../styles/UserPost.module.scss'
import {FaHeart, FaCommentAlt} from 'react-icons/fa'

interface Props {
    title: string
    body: string 
    timestamp: number 
    likes: []
  }
  
const UserPost : FC = (post) => {
  
  return (
      <section className={styles.user_post}>
      <div className={styles.container}>
      <div className={styles.wrapper}>
      <div className={styles.post_time_wrapper}>
        <p className={styles.post_time}> {new Date(post.post.timeStamp).toLocaleDateString()} </p>
      </div>
      <div className={styles.content_wrapper}>
        <p className={styles.post_title}> {post.post.title} </p>
        <div className={styles.reactions_wrapper}>
        <div className={styles.reaction_wrapper}>
          <FaHeart className={styles.icon} />
          <p className={styles.post_likes}> {post.post.likes.length} </p>
        </div>
        <div className={styles.reaction_wrapper}>
          <FaCommentAlt className={styles.icon} />
          <p className={styles.post_likes}> {post.post.comments.length} </p>
        </div>
        </div>
      </div>
      </div>
      </div>
      </section>
    )
}

export default UserPost