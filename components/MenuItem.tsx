import {FC} from 'react'
import styles from '../styles/MenuItem.module.scss'
import Link from 'next/link'
interface Props {
  icon: any
  url: any
  title: string
  id?: string 
}

const MenuItem: FC<Props> = (props) => {
  return (
      <Link href={props.url} >
        <a value={props.url} className={styles.menu_item} id={props.id} style={{color: props.titleColor}} >
          {props.icon} 
          <span style={{color: props.color}} >{props.title}</span>
        </a>
      </Link>
    )
}

export default MenuItem