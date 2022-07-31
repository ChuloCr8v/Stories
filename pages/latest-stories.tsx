import {FC, useState, useEffect} from 'react'
import styles from '../styles/LatestPost.module.scss'
import Story from '../components/Story'
import {fetchApprovedStories} from '../constants/methods'
import Loading from '../components/Loading'
import {auth, db} from '../constants/firebase'
import firebase from "firebase/compat/app";
import { getFirestore, arrayRemove, arrayUnion, deleteField, writeBatch, doc, updateDoc, getDoc } from "firebase/firestore"; 

const LatestStories :FC = () => {
  const [approvedStories, setApprovedStories] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false)
 
  useState(() => {
     fetchApprovedStories(approvedStories, setLoading) 
  }, [approvedStories])
  
 
  return (
     <div className={styles.container}>
       <div className={styles.wrapper}>
        {!loading ? (<div>
           {approvedStories.map((story) => (
         
             <Story title={story.title} story={story.post} posterName={story.posterName} likes={story.likes} views={story.views} postId={story.postId} posterEmail={story.posterEmail} postId={story.postId} approvedStories={approvedStories} setApprovedStories={setApprovedStories}  />
           ))}
         </div>) : <Loading />} 
       </div>
     </div>
    )
}

export default LatestStories 