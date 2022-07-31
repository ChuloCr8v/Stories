import {FC} from 'react'
import styles from '../styles/Textarea.module.scss'

interface Props {
  onChange: () => void
  value: string 
}

const Textarea : FC <Props> = (props) => {
  return (
      <textarea className={styles.textarea} rows="4" cols="50" onChange={props.onChange} placeholder="Once Upon A Time..." value={props.value}>
      </textarea>
   )
}

export default Textarea 