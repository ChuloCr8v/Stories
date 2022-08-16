import { FC, useState, useEffect } from "react";
import styles from "../styles/UserPosts.module.scss";
import { fetchUser } from "../constants/methods";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../constants/firebase";
import UserPost from "./UserPost";
import Spinner from "./Spinner";
import {motion} from 'framer-motion'

const UserPosts: FC = () => {
  const [loading, setLoading] = useState<any>(true);
  const [user, setUser] = useState<any>([]);
  const [approvedUserPosts, setApprovedUserPosts] = useState<any>([]);
 
  
  useEffect(() => {
    fetchUser(setUser);
    fetchPosts();
  }, []);

  setTimeout(() => {
    fetchPosts();
  }, 1000);

  //Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "posts"),
        where("username", "==", `${user.username}`)
      );
      const querySnapshot = await getDocs(q);
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc);
        setApprovedUserPosts(arr);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  
  return (
    <motion.section layout className={styles.user_posts}>       
      {approvedUserPosts?.length >= 1 ? (
        approvedUserPosts?.map((post) => (
          <UserPost post={post.data()} key={post.postId} />
        ))
      ) : (
        <Spinner />
      )}
    </motion.section>
  );
};

export default UserPosts;
