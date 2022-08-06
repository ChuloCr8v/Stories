import styles from "../styles/StoryPage.module.scss";
import CommentForm from "../components/CommentForm";
import { useState, useEffect } from "react";
import Comments from "../components/Comments";
import Button from "../components/Button";
import { sendComment, fetchUser } from "../constants/methods";
import firebase from "firebase/compat/app";
import Comment from "../components/Comment";
import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../constants/firebase";
import Spinner from "../components/Spinner";

interface Props {
  postId: number;
  title: string;
  story: string;
  username: string;
}

const Story = (props: {
  title: string;
  username: string;
  story: string;
  postId: any;
}) => {
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [user, setUser] = useState<any>("");
  const [commentTitle, setCommentTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [postComment, setPostComment] = useState<any>([]);
  const [filteredComments, setFilteredComments] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);

  const parentPostId = props.postId;
  const username = user.username;
  const fullName = user.fullName;

  //Fetch likes

  const getLikes = async () => {
    const docRef = doc(db, "posts", `${props.postId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLikes(docSnap.data().likes);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  //Fetch comments
  const fetchComments = async () => {
    try {
      const posts = await firebase
        .firestore()
        .collection("comments")
        .where("parentPostId", "==", parentPostId)
        .get();
      setPostComment([...posts.docs]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchUser(setUser);
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
        fetchComments,
      });
    }, 3000);
  };

  const handleLike = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "posts", parentPostId);
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
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_wrapper}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.poster}>By {props.username}</p>
      </div>
      <div className={styles.story_container}>
        <div className={styles.story_wrapper}>
          <p className={styles.content}>{props.story}</p>
        </div>
        <div className={styles.stats_wrapper}>
          {loading ? (
            <Spinner />
          ) : (
            <p className={styles.stat}>
              {" "}
              <FaThumbsUp
                style={{
                  color: likes.includes(username) ? "#000" : "lightgray",
                }}
              />
              <span>
                {likes.length} like{likes.length > 1 ? "s" : ""}{" "}
              </span>
            </p>
          )}
          <p className={styles.stat}>
            {" "}
            <FaCommentAlt /> <span>{postComment.length} comments </span>
          </p>
        </div>
      </div>
      <div className={styles.reactions}>
        <div className={styles.reaction} onClick={handleLike}>
          <FaThumbsUp className={styles.icon} />
        </div>
        <div
          onClick={() => setShowCommentBox(true)}
          className={styles.reaction}
        >
          <FaCommentAlt className={styles.icon} />
        </div>
      </div>
      <div className={styles.comments_container}></div>
      {`${postComment}`.length < 1 ? (
        "Be the first to comment on this post"
      ) : (
        <div className={styles.comment_wrapper}>
          {postComment.map((comm) => (
            <Comment
              postTitle={props.title}
              title={comm.data().commentTitle}
              comment={comm.data().comment}
              commenterName={comm.data().fullName}
              timeStamp={comm.data().timeStamp}
              likes = {comm.data().likes} 
              postId = {comm.data().postId} 
            />
          ))}
        </div>
      )}
      <div
        className={styles.comment_section}
        style={{ top: !showCommentBox ? "300%" : "0" }}
      >
        <CommentForm
          onChange={(e) => setComment(e.target.value)}
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
      likes: context.query.likes,
      //pass it to the page props
    },
  };
}
