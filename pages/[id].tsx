import { FC } from "react";
import styles from "../styles/StoryPage.module.scss";
import CommentForm from "../components/CommentForm";
import { useState, useEffect } from "react";
import { Button, Comments} from "../components";
import { sendComment, fetchUser, fetchComments } from "../constants/methods";

const Story: FC<Props> = (props) => {
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [commentTitle, setCommentTitle] = useState<string>("");
  const [comment, setComment] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [postComment, setPostComment] = useState<any>([])
  const [filteredComments, setFilteredComments] = useState<any>([])
 
  const parentPostId = props.postId;
  const username = user.username;
  const fullName = user.fullName;
  
  useEffect(() => {
    fetchUser(setUser);
    fetchComments(postComment)
  }, []);

  const confirmSendComment = () => {
    if (!comment && !commentTitle) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
      return;
    }
    setLoading(true);
    fetchUser(setUser);
    setTimeout(() => {
      sendComment({
        commentTitle,
        comment,
        setCommentTitle,
        setComment,
        username,
        parentPostId,
        setShowWarning,
        fullName,
        setLoading,
        setShowCommentBox,
      });
    }, 3000);
  }; 
  
  const getComments = async () => {
    try {
     const data = await postComment.filter((data) => data.parentPostId === parentPostId) 
     const filterData = data.map(_data => {
     return _data
     })
     setFilteredComments(filterData)
     console.log(filteredComments) 
    } catch(e) {
      console.log(e)
    }
  }
    
useEffect(() => {
 getComments()
}, [])

return (
  <div className={styles.container}>
    <div className={styles.title_wrapper}>
      <h2 className={styles.title}>{props.title}</h2>
      <p className={styles.poster}>By {props.username}</p>
    </div>
    <p className={styles.content}>{props.story}</p>
    <div className={styles.reactions}>
      <Button text={"Like"} onClick={() => console.log("liked")} />
      <Button
        text={"Comment"}
        onClick={() => setShowCommentBox(!showCommentBox)}
      />
    </div>
    <div className={styles.comments_wrapper} >
     {filteredComments.length < 1 ? 'Loading' : <Comments filteredComments={filteredComments} /> } 
   
      </div>
      <div
        className={styles.comment_section}
        style={{ top: !showCommentBox ? "100%" : "0" }}
      >
        <CommentForm
          onChange={(e) => setComment(e.target.value)}
          sendComment={() => confirmSendComment}
          comment={comment}
          commentTitle={commentTitle}
          showCommentBox={showCommentBox}
          setShowCommentBox={setShowCommentBox}
          value={comment}
          showWarning={showWarning}
          sendComment={() => confirmSendComment}
          handleCommentTitle={(e) => setCommentTitle(e.target.value)}
          handleComment={(e) => setComment(e.target.value)}
          loading={loading}
          bg={loading ? "#fff" : ""}
          titlePlaceholder={"Give your comment a heading..."}
          commentPlaceholder={"Leave your comment..."}
        />
      </div>
     
    </div>
  );
};

export default Story;

export async function getServerSideProps(context) {
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
    },
  };
}
