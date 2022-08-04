import styles from '../styles/Comment.module.scss'
import {Button} from './'

interface Props {
  title: string
  comment: string 
  handleReply: () => void
}

const Comment: FC <Props> = (props) => { 
  return ( 
      <div className={styles.comment}>
        <h2 className={styles.comment_title}>{props.title}</h2>
        <p className={styles.comment_body}>{props.comment}</p>
        <div className={styles.btn_wrapper}>
          <Button text={'Like'} onClick={props.handleReply} />
          <Button text={'Reply'} onClick={props.handleReply} />
        </div>
      </div>
    ); 
  }; 
  
export default Comment