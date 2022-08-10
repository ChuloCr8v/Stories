import {FC, useState, useEffect} from 'react'
import styles from '../styles/UserPosts.module.scss'
import {fetchUser} from '../constants/methods'
import firebase from "firebase/compat/app";
import { doc, getDoc, getDocs, updateDoc, query, collection, where} from "firebase/firestore";
import { db } from "../constants/firebase";

const UserPosts : FC = () => {
  const [user, setUser] = useState<any>([])
  const [approvedUserPosts, setApprovedUserPosts] = useState<any>([]);
  
  //Fetch posts
  const fetchPosts = async () => {
    alert('hi')
    try {
      const q = query(collection(db, "posts"), where("posterEmail".toLowerCase(), "==", `${user.email}`.toLowerCase())) ;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         console.log(doc.id, " => ", doc.data());
         console.log(doc);
         console.log('done');
      });
    } catch (e) {
      console.log(e);
      alert(e)
    }
  };

  useEffect(() => {
    fetchUser(setUser)
    fetchPosts();
  }, []);

  return (
      <section className={styles.user_posts}>
        {approvedUserPosts.map((post) => console.log(post)) 
        } 
      </section>
    )
}

export default UserPosts