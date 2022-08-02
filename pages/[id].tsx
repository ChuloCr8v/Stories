
import {FC} from 'react'
import styles from '../styles/StoryPage.module.scss'



const Story : FC <Props> = (props) => {
  return(
      <div className={styles.container} > 
        <div className={styles.title_wrapper} > 
          <h2 className={styles.title}>{props.title}</h2>
        </div>
        <p className={styles.poster}>{props.username}</p>
        <p className={styles.content}>{props.story}</p>
      </div>
    )
}

export default Story


export async function getServerSideProps(context) {
  console.log(context.query)
  // returns { id: episode.itunes.episode, title: episode.title}
  //you can make DB queries using the data in context.query
  return {
    props: {
      title: context.query.title, 
      username: context.query.username, 
      story: context.query.story, 
      //pass it to the page props
    }
  }
}