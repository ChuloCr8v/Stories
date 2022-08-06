import styles from "../styles/Comment.module.scss";
import { Button } from "./";
import * as dayjs from 'dayjs'
import {useState, useEffect} from 'react'
import {FaPaperPlane, FaThumbsUp} from 'react-icons/fa'
import Spinner from './Spinner'
import {fetchUser} from '../constants/methods'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../constants/firebase";

interface Props {
  title: string;
  comment: string;
  handleReply: () => void;
}
const Comment: FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [likes, setLikes] = useState<any>([]) 
  const [user, setUser] = useState<any>([]) 
  
  const postId = props.postId 
  
  const getLikes = async () => {
    const docRef = doc(db, "comments", `${postId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLikes(docSnap.data().likes);
      console.log(likes)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  
  useEffect(() => {
    getLikes()
  }, [])

  const handleLike = async () => {
    fetchUser(setUser)
    console.log(user)
    try {
      setLoading(true);
      const docRef = doc(db, "posts", props.postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (docSnap.data().likes.includes(username)) {
          await updateDoc(docRef, {
            likes: firebase.firestore.FieldValue.arrayRemove(`${username}`),
          });
          getLikes();
        } else {
          await updateDoc(docRef, {
            likes: firebase.firestore.FieldValue.arrayUnion(`${username}`),
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
      alert(e)
    }
  };

  
  return (
    <div className={styles.comment}>
      <div className={styles.commenter_details}>
        <p className={styles.post_title}>Re: {props.postTitle} </p>
        <div className={styles.commenter_name_wrapper}>
          <p className={styles.commenter_name}>{props.commenterName} </p>
          <p className={styles.time}>{dayjs(props.timeStamp).format('YYYY-MM-DD H:mm')} </p>
        </div>
      </div>
      <h2 className={styles.comment_title}>{props.title}</h2>
      <p className={styles.comment_body}>{props.comment}</p>
      <div className={styles.reactions_wrapper}>
      <div className={styles.input_wrapper}>
        <input type='text' className={styles.reply_input} placeholder = "leave a reply" />
        <FaPaperPlane className={styles.send_icon} />
      </div>
      {loading ? <Spinner /> : <div className={styles.likes_wrapper}>
        <FaThumbsUp onClick={handleLike} className={styles.likel_icon} />
        <span> {likes.length} likes</span>
      </div>} 
      </div>
    </div>
  );
};

export default Comment;
