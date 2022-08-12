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
  
  console.log(post.post.title)
  return (
      <section className={styles.user_post}>
      <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.post_title}> {post.post.title} </p>
        <p className={styles.post_body}> {post.post.post} </p>
        <p className={styles.post_time}> {post.post.timestamp} </p>
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
      </section>
    )
}

export default UserPost