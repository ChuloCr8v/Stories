import styles from "../styles/Comment.module.scss";
import { Button } from "./";
import * as dayjs from "dayjs";
import { useState, useEffect } from "react";
import { FaPaperPlane, FaThumbsUp } from "react-icons/fa";
import Spinner from "./Spinner";
import { fetchUser } from "../constants/methods";
import { doc, getDoc, updateDoc, addDoc, query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../constants/firebase";
import firebase from "firebase/compat/app";
import { auth } from "../constants/firebase";
import Reply from './Reply'

interface Props {
  title: string;
  comment: string;
  handleReply: () => void;
}

const Comment: FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [likes, setLikes] = useState<any>([]);
  const [user, setUser] = useState<any>([]);
  const [reply, setReply] = useState<any>('');
  const [replyArray, setReplyArray] = useState<any>([]);

  const postId = props.postId;
  
  const getLikes = async () => {
    const docRef = doc(db, "comments", `${postId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLikes(docSnap.data().likes);
      console.log(likes);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getLikes();
    fetchUser(setUser)
  }, []);
  
  const handleLike = async () => {
    const us = auth.currentUser 
    alert(200, us)
    if(user.username === undefined){
      alert('no user')
    return
    }
    fetchUser(setUser);
    try {
      setLoading(true);
      const docRef = doc(db, "comments", `${postId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (docSnap.data().likes.includes(`${user.username}`)) {
          await updateDoc(docRef, {
            likes: firebase.firestore.FieldValue.arrayRemove(
              `${user.username}`
            ),
          });
          getLikes();
        } else {
          await updateDoc(docRef, {
            likes: firebase.firestore.FieldValue.arrayUnion(`${user.username}`),
          });
          getLikes();
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      alert("unable to process your like at the moment. Give it another try");
    }
  };
  
  const handleReply = async () => {
    if(reply === ''){
      alert('Reply cant be empty')
      return
    }
    const replyId = Date.now()
    const replyData =  {
       reply,
       replyId, 
       replyUsername: user.username, 
       parentCommentId: postId, 
       parentCommentUsername: props.username, 
       timeStamp: Date.now(), 
       likes: [], 
    }
    try {
       await addDoc(collection(db, "replies"), replyData);
       alert('Reply Sent')
       setReply('')
       fetchReply()
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }
  
  
  const fetchReply = async () => {
    try {
      const q = query(collection(db, "replies"), where("parentCommentId", "==", postId));

      const querySnapshot = await getDocs(q);
      const arr = []
      querySnapshot.forEach((doc) => {
          arr.push(doc.data())
          setReplyArray(arr)
      }); 
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }
  
  useEffect(() => {
    fetchReply()
  }, []) 
  
  
  return (
    <div className={styles.comment}>
      <div className={styles.commenter_details}>
        <p className={styles.post_title}>Re: {props.postTitle} </p>
        <div className={styles.commenter_name_wrapper}>
          <p className={styles.commenter_name}>{props.commenterName} </p>
          <p className={styles.time}>
            {dayjs(props.timeStamp).format("YYYY-MM-DD H:mm")}{" "}
          </p>
        </div>
      </div>
      <h2 className={styles.comment_title}>{props.title}</h2>
      <p className={styles.comment_body}>{props.comment}</p>
      <div className={styles.reactions_wrapper}>
        <div className={styles.input_wrapper}>
          <input
            type="text"
            className={styles.reply_input}
            placeholder="leave a reply"
            onChange={(e) => setReply(e.target.value)} 
            value = {reply} 
          />
          <FaPaperPlane className={styles.send_icon} onClick={handleReply} />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.likes_wrapper}>
            <FaThumbsUp onClick={handleLike} className={styles.likel_icon} style={{color: likes.includes(user.username) ? '#000' : 'lightgray'}} />
            <span> {likes.length} likes</span>
          </div>
        )}
      </div>
      <div className={styles.reply_wrapper}>
          {replyArray.map((re) => (
            <Reply reply={re.reply} username={re.replyUsername} likes={re.likes} key={re.timestamp} handleReply={handleReply} setReply = {setReply} />
          ))} 
      </div>
    </div>
  );
};

export default Comment;
