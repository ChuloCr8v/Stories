import {FC, useState, useEffect} from 'react'
import {Button, Heading} from '../components'
import styles from '../styles/Home.module.scss'
import { getAuth } from "firebase/auth";
import TextEditor from '../components/TextEditor'
import Router from 'next/router'
import {fetchApprovedStories} from '../constants/methods'
import Story from '../components/Story'
import Loading from '../components/Loading'
import {motion} from 'framer-motion'

const Home : FC = () => {
  const [approvedStories, setApprovedStories] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  
  const auth = getAuth()
  const signout = async () => {
    try {
      auth.signOut()
      Router.push('/MainNav')
    } catch (e) {
      alert(e)
    }
  }
 
 const categories = [
     {name: 'General'}, 
     {name: 'Romance'}, 
     {name: 'Thriller'}, 
     {name: 'Action'}, 
     {name: 'Science fiction'}, 
   ]
   
   useEffect(() => {
     fetchApprovedStories({approvedStories, setApprovedStories, setLoading})
   }, [])
   
  return (
      <section className={styles.home}>
       <div className={styles.container}>
       <div className={styles.wrapper}> 
        <div className={styles.category_heading_wrapper}>
          <Heading heading={'Categories'} />
        <div className={styles.category_wrapper}>
          {categories.map((category) => (
            <div className={styles.category}>
              <p> {category.name} </p>
            </div>
          ))}
        </div> 
        </div> 
        {!loading ? (
        <div className={styles.stories_heading_wrapper}>
         <Heading heading={'top stories'} />
        <motion.div layout className={styles.stories_wrapper}>
          {approvedStories.map((story: any) => (
             <Story
               title={story.title}
               story={story.post}
               username={story.username}
               posterName={story.posterName}
               views={story.views}
               postId={story.postId}
               posterEmail={story.posterEmail}
               approvedStories={approvedStories}
               setApprovedStories={setApprovedStories}
               comments={story.comments}
            />
          ))}
        </motion.div>
        </div>
        ) : (
          <Loading title={"Getting New Posts"} />
        )}
      </div>
        
        <Button text="Sign Out" onClick={signout} />
      </div>
      </section>
   ) 
}

export default Home