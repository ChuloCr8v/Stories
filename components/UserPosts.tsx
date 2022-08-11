import {FC, useState, useEffect} from 'react'
import styles from '../styles/UserPosts.module.scss'
import {fetchUser} from '../constants/methods'
import firebase from "firebase/compat/app";
import { doc, getDoc, getDocs, updateDoc, query, collection, where} from "firebase/firestore";
import { db } from "../constants/firebase";
import UserPost from './UserPost'
import Spinner from './Spinner'

const UserPosts : FC = () => {
  const [loading, setLoading] = useState<any>(true)
  const [user, setUser] = useState<any>([])
  const [approvedUserPosts, setApprovedUserPosts] = useState<any>('');
    
  
  useEffect(() => {
    fetchUser(setUser)
    fetchPosts()
  }, [])
  
  //Fetch posts
  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), where("username", "==", `${user.username}`)) 
      const querySnapshot = await getDocs(q);
      const arr = []
      console.log(arr)
      await querySnapshot.forEach((doc) => {
      console.log('running')
         // doc.data() is never undefined for query doc snapshots
         arr.push(doc.data());
         setApprovedUserPosts(arr)
         setLoading(false)
    });
    } catch (e) {
      console.log(e);
      alert(e)
    }
  };

 
  return (
      <section className={styles.user_posts}>
        {approvedUserPosts?.length >= 1 ? approvedUserPosts?.map((post) => (
            <UserPost post={post} />
        )
             ) : 'Nothing to show'}   
      </section>
    )
}
 
export default UserPosts 