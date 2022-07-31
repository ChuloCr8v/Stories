import {FC} from 'react'
import styles from '../styles/Button.module.scss'
interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button:FC <Props> = (props) => {
  return(
      <button className={styles.btn} onClick={props.onClick} disabled={props.disabled}>{props.text}</button>
    )
}

export default Button 