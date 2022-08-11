import { FC, useState, useEffect } from "react";
import styles from "../styles/UserPost.module.scss";

interface Props {
  title: string;
  body: string;
  timestamp: number;
  post: string;
  username: string;
  posterName: string;
  posterEmail: string;
  likes: [];
}

const UserPost: FC = (post: any) => {
  return (
    <section className={styles.user_post}>
      <p className={styles.post_title}> {post.post.title} </p>
      <p className={styles.post_title}> {post.post.post} </p>
      <p className={styles.post_title}> {post.post.timestamp} </p>
      <p className={styles.post_title}> {post.post.likes} </p>
    </section>
  );
};

export default UserPost;