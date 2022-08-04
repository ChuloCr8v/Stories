import {FC, useState, useEffect} from 'react'
import styles from '../styles/LatestPost.module.scss'
import Story from '../components/Story'
import {fetchApprovedStories} from '../constants/methods'
import Loading from '../components/Loading'

const LatestStories :FC = () => {
  const [approvedStories, setApprovedStories] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false)
 
  useEffect(() => {
     fetchApprovedStories(approvedStories, setLoading) 
  }, [])
  
 
  return (
     <div className={styles.container}>
       <div className={styles.wrapper}>
        {!loading ? (<div>
           {approvedStories.map((story) => (
         
             <Story title={story.title} story={story.post} username={story.username} posterName={story.posterName} likes={story.likes} views={story.views} postId={story.postId} posterEmail={story.posterEmail} posterName={story.posterName} postId={story.postId} approvedStories={approvedStories} setApprovedStories={setApprovedStories}  />
           ))}
         </div>) : <Loading />} 
       </div>
     </div>
    )
}

export default LatestStories 