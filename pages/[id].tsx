import {FC} from 'react'
import styles from '../styles/StoryPage.module.scss'
import CommentForm from '../components/CommentForm'
import {useState, useEffect} from 'react'
import {Button} from '../components'
import {sendComment} from '../constants/methods'

const Story : FC <Props> = (props) => {
  
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false)
  const [commentTitle, setCommentTitle] = useState<string>('')
 const [comment, setComment] = useState<string>('')
 const [showWarning, setShowWarning] = useState<boolean>(false)
 
  const postId = Date.now()
  const parentPostId= props.postId 
  const username= props.username
  const fullName= props.fullName
  
  
  const confirmSendComment = () => {
    sendComment({commentTitle, comment, username, postId, parentPostId, setShowWarning, fullName})    
  }
 
  return(
      <div className={styles.container} > 
        <div className={styles.title_wrapper} > 
          <h2 className={styles.title}>{props.title}</h2>
          <p className={styles.poster}>By {props.username}</p>
        </div>
        <p className={styles.content}>{props.story}</p>
        <div className={styles.reactions}>
          <Button text={'Like'} onClick={() => console.log('liked')} />
          <Button text={'Comment'} onClick={() => setShowCommentBox(!showCommentBox)} />
        </div>
        <div className={styles.comment_section} style= {{top: !showCommentBox ? '100%' : '0' }} >
            <CommentForm onChange={(e) => setComment(e.target.value)} sendComment={() => confirmSendComment} showCommentBox={showCommentBox} setShowCommentBox={setShowCommentBox} value={comment} showWarning={showWarning} sendComment={() => confirmSendComment} handleCommentTitle={(e) => setCommentTitle(e.target.value)} handleComment={(e) => setComment(e.target.value)} />
          </div>
     </div>
    )
}

export default Story


export async function getServerSideProps(context) {
  console.log(context.query)
  // returns { id: episode.itunes.episode, title: episode.title}
  //you can make DB queries using the data in context.query
  return {
    props: {
      fullName: context.query.fullName, 
      title: context.query.title, 
      username: context.query.username, 
      story: context.query.story, 
      postId: context.query.id, 
      //pass it to the page props
    }
  }
}