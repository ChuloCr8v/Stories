
import { FC } from 'react';
import styles from '../styles/Comments.module.scss'
import Comment from './Comment'

interface Props {
  postComment: any
}

const Comments : FC = (postComment: any) => { 
  console.log(postComment)
  return ( 
      <section className={styles.comments}>
         {
           postComment.map((filtered: any) => (
              <Comment title={filtered.commentTitle} comment={filtered.comment} />
           ))
         } 
      </section>
    ); 
  }; 
   
export default Comments 