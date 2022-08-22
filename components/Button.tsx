import {FC} from 'react'
import styles from '../styles/Button.module.scss'
interface Props {
  text: any;
  onClick: () => void;
  disabled?: boolean;
  bg: any;
}

const Button:FC <Props> = (props) => {
  return(
      <button className={styles.btn} onClick={props.onClick} disabled={props.disabled} style={{background: props.bg, color: props.color}} >{props.text}</button>
    )
}

export default Button 