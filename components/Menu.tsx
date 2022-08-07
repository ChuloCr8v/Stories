import {FC, useState, useEffect} from 'react'
import styles from '../styles/Menu.module.scss'
import MenuItem from './MenuItem'
import {FaHome, FaPenFancy, FaNewspaper} from 'react-icons/fa'

interface Props {
  bottom: any
}


const Menu: FC <Props> = (props) => {
  
  return (
      <div className={styles.menu} style={{bottom: props.bottom}} >
        <MenuItem title={"Home"} url={"/"} icon={<FaHome className={styles.icon} />} />
        <MenuItem title={"Write"} url={"/NewPost"} icon={<FaPenFancy className={styles.icon} />} id={styles.write_menu_item} style={{left: props.left, top: props.top}} />
        <MenuItem title={"Latest Posts"} url={"/latest-stories"} icon={<FaNewspaper className={styles.icon} />} />
      </div>
    )
}

export default Menu