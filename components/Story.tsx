import { FC, useState, useEffect } from "react";
import styles from "../styles/Story.module.scss";
import { FaThumbsUp, FaEye } from "react-icons/fa";
import { auth, db } from "../constants/firebase";
import { fetchUserProfile } from '../constants/methods'
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
import { getDocs, query, collection, where } from "firebase/firestore";

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
  const [userProfileDetails, setUserProfileDetails] = useState<[]>([])
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
    users.length >= 1 && users.forEach((doc) => {
      arr.push(doc.data());
    });
    const filteredUser = arr.length >= 1 ? arr.filter(
      (user_) => user_.email.toLowerCase() === _user.email.toLowerCase()
    ) : '';
    filteredUser.length > 0 && filteredUser.map((filtered) => {
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

  useEffect(() => {
  fetchUserProfile({userEmail: props.posterEmail, setUserProfileDetails})
}, [])
  
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  
  const addView = async () => {
    getUser()
  try {
      const docRef = doc(db, "posts", `${props.postId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().views.includes(user)) {
        return 
       } else {
        await updateDoc(docRef, {
          views: firebase.firestore.FieldValue.arrayUnion(`${user}`),
        });
          alert('view updated')
      }
      alert('view updated')
    } catch (e) {
      console.log(e);
      alert(e)
    }
}
  
  
  return (
    <div className={styles.container} onClick={addView}>
    <div className={styles.wrapper}>
      <div className={styles.story_art_wrapper}>
        {props.storyArt ? <Image src={props.storyArt} className={styles.story_art} height={300} width={200} /> : 
          <div className={styles.story_art_placeholder}>
            <h3 className={styles.title}>{props.title}</h3>
            <p className={styles.poster} >{props.username} </p>
          </div>
        }
      </div>
      <div className={styles.story_content_wrapper}>
        <Link
          onClick={addView} 
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
        <Link
         href={{
            pathname: "/user/[user]",
            query: {
              user: props.username,
              id: props.username,
              posterEmail: props.posterEmail,
            },
          }}
        >
          <a className={styles.name}>
            <span>By: </span>
            {props.username || props.posterName}{" "}
          </a>
        </Link>
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
      </div>
    </div>
  );
};

export default Story;
   
 