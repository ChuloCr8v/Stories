import { FC } from "react";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";

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

const sendPost: FC<Props> = async ({
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
  } catch (e) {
    {
      setLoading(false);
    }
    console.log(e);
  }
};

const fetchApprovedStories: FC<Props> = async (approvedStories, setLoading) => {
  setLoading(true);
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      {
        approvedStories.push(doc.data());
      }
      setLoading(false);
    });
  } catch (e) {
    console.log(e);
  }
};

const fetchUsers = async (setUsers) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    setUsers(querySnapshot);
  } catch (e) {
    console.log(e);
  }
};

const fetchUser = async (setUser) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const user = auth.currentUser;
    const data = doc.data();
    Object.fromEntries(
      Object.entries(data).filter(([key, val]) => {
        const verifyUser = val.toLowerCase().includes(user.email);
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
  } catch (e) {
    console.log(e);
    alert(e);
    setLoading(false);
  }
};

//Fetch comments
const fetchComments = async (postComment) => {  
  
  try {
    const querySnapshot = await getDocs(collection(db, "comments"));
    querySnapshot.forEach((doc) => {
      const res = doc.data()
      postComment.push(res)
    })
  } catch(e) {
    console.log(e)
  }
 } 


export { sendPost, fetchApprovedStories, fetchUsers, fetchUser, sendComment, fetchComments };
