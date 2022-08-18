import { FC, useState, useEffect } from "react";
import styles from "../styles/Story.module.scss";
import { FaThumbsUp, FaEye } from "react-icons/fa";
import { auth, db } from "../constants/firebase";
import firebase from "firebase/compat/app";
import DOMPurify from 'dompurify';
import {
  getFirestore,
  arrayRemove,
  arrayUnion,
  deleteField,
  writeBatch,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { fetchUsers } from "../constants/methods";
import Link from "next/link";
import Spinner from "./Spinner";

interface Props {
  title: string;
  story: string;
  posterName: string;
  posterEmail: string;
  username: string;
  views: any;
  postId: number;
  comments: any;
  setApprovedStories: any;
  approvedStories: any;
}

const Story: FC<Props> = (props) => {
  const [likes, setLikes] = useState<any>([]);
  const [liked, setLiked] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [users, setUsers] = useState<any>([]);
  const [user, setUser] = useState<any>("");
  const [fullName, setFullName] = useState<any>("");
  const _user = auth.currentUser;

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

  const getUser = () => {
    const arr = [];
    users.forEach((doc) => {
      arr.push(doc.data());
    });
    const filteredUser = arr.filter(
      (user_) => user_.email.toLowerCase() === _user.email.toLowerCase()
    );
    filteredUser.map((filtered) => {
      setUser(filtered.username);
      setFullName(filtered.fullName);
    });
  };

  useEffect(() => {
    fetchUsers(setUsers);
    getUser();
  }, []);

  setTimeout(() => {
    getUser();
  }, 1000);

  useEffect(() => {
    getLikes();
  }, []);

  const handleLike = async () => {
    getUser();
    setLoading(true);
    try {
      const docRef = doc(db, "posts", `${props.postId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().likes.includes(user)) {
        await updateDoc(docRef, {
          likes: firebase.firestore.FieldValue.arrayRemove(`${user}`),
        });
        getLikes();
      } else {
        await updateDoc(docRef, {
          likes: firebase.firestore.FieldValue.arrayUnion(`${user}`),
        });
        getLikes();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  
  return (
    <div className={styles.wrapper}>
      <Link
        href={{
          pathname: "/[id]",
          query: {
            id: props.postId,
            title: props.title,
            story: props.story,
            username: props.username,
            fullName: props.fullName,
            likes: props.likes,
          },
        }}
      >
        <a className={styles.single_story}>
          <h2 className={styles.title}>{props.title} </h2>
        </a>
      </Link>
      <p className={styles.name}>
        <span>By: </span>
        {props.username || props.posterName}{" "}
      </p>
      <p className={styles.story} dangerouslySetInnerHTML={createMarkup(props.story)}>
      </p>
      <div className={styles.stats_wrapper}>
        <div className={styles.stat}>
          {loading ? (
            <Spinner />
          ) : (
            <FaThumbsUp
              className={styles.icon}
              id={styles.like_icon}
              onClick={handleLike}
              style={{ color: likes.includes(user) ? "#000000" : "#d9d9d9" }}
            />
          )}
          {loading ? (
            ""
          ) : (
            <p className={styles.likers}>
              {likes.length > 1
                ? `${likes.slice(-1)} and ${likes.length - 1} others `
                : likes}{" "}
            </p>
          )}
        </div>
        <div className={styles.stat}>
          <FaEye className={styles.icon} />
          <p className={styles.likers}>{props.views}</p>
        </div>
      </div>
    </div>
  );
};

export default Story;
   