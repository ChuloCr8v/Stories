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
      <Link href={props.url}>
        <a className={styles.menu_item} id={props.id}>
          {props.icon} 
          <span>{props.title}</span>
        </a>
      </Link>
    )
}

export default MenuItem