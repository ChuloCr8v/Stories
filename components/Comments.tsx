
import styles from '../styles/Comments.module.scss'
import {Comment} from './'

const Comments : FC = (filteredComments) => { 
  return ( 
      <section className={styles.comments}>
         {
           filteredComments.map((filtered) => (
              <Comment title={filtered.commentTitle} comment={filtered.comment} />
           ))
         } 
      </section>
    ); 
  }; 
  
export default Comments 