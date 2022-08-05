import styles from "../styles/Comment.module.scss";
import { Button } from "./";
import dayjs from 'dayjs'

interface Props {
  title: string;
  comment: string;
  handleReply: () => void;
}

const Comment: FC<Props> = (props) => {
  return (
    <div className={styles.comment}>
      <div className={styles.commenter_details}>
        <p className={styles.commenter_name}>{props.commenterName} </p>
        <p className={styles.time}>{dayjs(props.timeStamp)} </p>
      </div>
      <h2 className={styles.comment_title}>{props.title}</h2>
      <p className={styles.comment_body}>{props.comment}</p>
      <div className={styles.btn_wrapper}>
        <Button text={"Like"} onClick={props.handleReply} />
        <Button text={"Reply"} onClick={props.handleReply} />
      </div>
    </div>
  );
};

export default Comment;
