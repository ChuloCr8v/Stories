import { FC, useState, useEffect } from "react";
import styles from "../styles/LatestPost.module.scss";
import Story from "../components/Story";
import Loading from "../components/Loading";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../constants/firebase";

const LatestStories: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [approvedPosts, setApprovedPosts] = useState<any>([]);

  const fetchApprovedStories = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc);
      });
      setApprovedPosts(posts);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedStories();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {!loading ? (
          <div className={styles.stories_wrapper} >
            {approvedPosts.map((story: any) => (
              <Story
                title={story.data().title}
                story={story.data().post}
                username={story.data().username}
                posterName={story.data().posterName}
                views={story.data().views}
                postId={story.data().postId}
                posterEmail={story.data().posterEmail}
                approvedStories={approvedPosts}
                setApprovedStories={setApprovedPosts}
                comments={story.data().comments}
              />
            ))}
          </div>
        ) : (
          <Loading title={"Getting New Posts"} />
        )}
      </div>
    </div>
  );
};

export default LatestStories;
