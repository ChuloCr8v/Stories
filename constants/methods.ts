import { Dispatch, FC, SetStateAction } from "react";
import { doc, setDoc, collection, getDocs, getDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";
import Router from "next/router";

interface Props {
  postId: number;
  title: string;
  post: string;
  setLoading?: () => void;
  setApprovedStories: any;
  approvedStories: any;
  loading: boolean;
  setTitle: string;
  setPost: string;
  posterName: string;
  posterEmail: string;
}

const sendPost = async ({
  title,
  post,
  loading,
  setLoading,
  setConfirmPost,
  setTitle,
  setPost,
  postId,
  posterName,
  posterEmail,
  username,
  genres
}) => {
  try {
    //  console.log(username)
    {
      setLoading(true);
    }
    await setDoc(
      doc(db, "posts", `${postId}`),
      {
        title,
        post,
        genres,
        username,
        posterName,
        posterEmail,
        isApproved: false,
        timeStamp: Date.now(),
        comments: [],
        likes: [],
        views: 0,
        postId,
      },
      { merge: true }
    );
    {
      setLoading(false);
    }
    setConfirmPost(false);
    {
      setTitle("");
    }
    {
      setPost("");
    }
    Router.push("/Home");
  } catch (e) {
    {
      setLoading(false);
    }
    console.log(e);
  }
};

const fetchApprovedStories = async ({approvedStories, setApprovedStories, setLoading}) => {
  setLoading(true);
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const stories = []
    querySnapshot.forEach((doc: { data: () => any; }) => {
      { 
        stories.push(doc.data())
        setApprovedStories(stories);
      }
      setLoading(false);
    });
  } catch (e) {
    console.log(e);
    setLoading(false)
  }
};

const fetchUsers = async (setUsers: { (value: any): void; (arg0: any): void; }) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    setUsers(querySnapshot);
  } catch (e) {
    console.log(e);
  }
};

const fetchUser = async (setUser: { (value: any): void; (value: any): void; (arg0: any): void; }) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc: { data: () => any; }) => {
    const _verifyUser = auth.currentUser;
    const user = _verifyUser !== '' ? _verifyUser : '';
    const data = doc.data();
    Object.fromEntries(
      Object.entries(data).filter(([key, val]) => {
        const verifyUser = user && val.toLowerCase().includes(user.email);
        if (verifyUser) {
          setUser(data);
        }
      })
    );
  });
};

//Make Comment

const sendComment = async ({
  commentTitle,
  comment,
  setCommentTitle,
  setComment,
  username,
  fullName,
  parentPostId,
  setShowWarning,
  setLoading,
  setShowCommentBox,
   fetchComments
}) => {
  try {
    const postId = Date.now();
    await setDoc(
      doc(db, "comments", `${postId}`),
      {
        commentTitle,
        comment,
        username,
        fullName,
        timeStamp: Date.now(),
        likes: [],
        postId,
        parentPostId,
      },
      { merge: true }
    );
    setCommentTitle("");
    setComment("");
    setLoading(false);
    setShowCommentBox(false);
    fetchComments()
  } catch (e) {
    console.log(e);
    alert(e);
    setLoading(false);
  }
};

const fetchUserProfile = async (props) => {
  try {
     const q = query(
     collection(db, "users"),
       where('email', "==", `${props.userEmail}`) 
      ); 
      const querySnapshot = await getDocs(q);
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
        props.setUserProfileDetails(arr)
      });
    } catch (e) {
      console.log(e);
    }
  
}
 

export {
  sendPost,
  fetchApprovedStories,
  fetchUsers,
  fetchUser,
  sendComment,
  fetchUserProfile
};
