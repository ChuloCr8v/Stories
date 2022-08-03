import styles from '../styles/CommentForm.module.scss'
import {FC, useState} from 'react'
import {Button, Toast, Input} from './'

interface Props {
  sendComment: () => void 
  onClick: () => void 
  onChange: () => void 
  value: string
}
const CommentForm : FC <Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  
  return (
     <div className={styles.container} >
     <div className={styles.wrapper} >
      <div className={styles.form} >
       <p className={styles.warning} style={{opacity: props.showWarning ? 1 : 0, transform: props.showWarning ? 'translateY(100%)' : 'translateY(100%)'}} >Please Leave A Comment Or Click On Cancel To Keep Going!</p>
       <Input type={'text'} onChange={props.handleCommentTitle} value={props.commentTitle} />
       <textarea rows="4" cols="50" className={styles.comment} onChange={props.handleComment} value={props.comment} />  
       <div className={styles.btn_wrapper}>
         <Button onClick={props.sendComment()} text={'Send'} />
         <Button onClick={() => props.setShowCommentBox(!props.showCommentBox)} text={'Cancel'} />
       </div>
       </div>
      </div>
      </div>
   )
}

export default CommentForm