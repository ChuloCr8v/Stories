import {FC} from 'react'
import styles from '../styles/Input.module.scss'

interface Props {
  type: string;
  placeholder: string;
  onChange: () => void;
  required: boolean;
}

const Input :FC <Props> = (props) => {
  return(
      <input className={styles.input} type={props.type} placeholder={props.placeholder} onChange={props.onChange} required={props.required} />
    )
}

export default Input