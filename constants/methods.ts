import {FC} from 'react'
import { doc, setDoc, collection, getDocs, getDoc} from "firebase/firestore"; 
import {db} from './firebase'

interface Props {
  postId: number 
  title: string 
  post: string
  setLoading?: () => void 
  setApprovedStories: any
  approvedStories: any
  loading: boolean
  setTitle: string 
  setPost: string 
  posterName: string
  posterEmail: string
}

const sendPost: FC <Props> = async ({title, post, loading, setLoading, setConfirmPost, setTitle, setPost, postId, posterName, posterEmail, username}) => {
    try {
    //  console.log(username)
      {setLoading(true)} 
      await setDoc(doc(db, "posts", `${postId}`), {title, post, username, posterName, posterEmail, isApproved: false, timeStamp: Date.now(), comments: [], likes: [], views: 0, postId}, {merge: true} ); 
      {setLoading(false)}
      setConfirmPost(false)
      {setTitle('')}
      {setPost('')} 
    } catch(e) {
      {setLoading(false)}
      console.log(e)
    }
}

const fetchApprovedStories : FC<Props> = async (approvedStories, setLoading) => {
    setLoading(true)
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      {approvedStories.push(doc.data())} 
      setLoading(false)
  });
    
  } catch (e) {
    console.log(e)
  }
}

const fetchUsers = async (setUsers) => {
   try {
       const querySnapshot = await getDocs(collection(db, "users"));
        setUsers(querySnapshot);

   } catch(e) {
       console.log(e)
    } 
}

//Make Comment

const sendComment = async ({commentTitle, comment, username, fullName, postId, parentPostId, setShowWarning}) => {
  console.log(fullName)
  if(comment === ''){
      setShowWarning(true)
      setTimeout(() => {
        setShowWarning(false)
      }, 5000)
      return
  } 
  try {
      await setDoc(doc(db, "comments", 'comment'), {commentTitle, comment, username, timeStamp: Date.now(), likes: [], postId, parentPostId}, {merge: true} ); 
    } catch(e) {
      console.log(e)
      alert(e)
    }
  }


export {sendPost, fetchApprovedStories, fetchUsers, sendComment
}