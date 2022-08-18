import {FC, useState, useEffect} from 'react'
import styles from '../styles/Genres.module.scss'

const Genres: FC = ({handleCheck} ) =>  {
  
  return (
    <div className={styles.genres}>
      <div className={styles.genre}>
        <label htmlFor="Action">Action </label>
        <input name="genre" type="checkbox" value="Action" onChange={(e) => handleCheck(e)} />
      </div>
      <div className={styles.genre}>
        <label htmlFor="Paranormal">Paranormal </label>
        <input name="genre" type="checkbox" value="Paranormal" onChange={(e) => {handleCheck(e)}} />
      </div>
      <div className={styles.genre}>
        <label htmlFor="Horror">Horror </label>
        <input name="genre" type="checkbox" value="Horror" onChange={(e) => {handleCheck(e)}}/>
      </div>
      <div className={styles.genre}>
        <label htmlFor="Mystery">Mystery </label>
        <input name="genre" type="checkbox" value="Mystery" onChange={(e) => {handleCheck(e)}} />
      </div>
      <div className={styles.genre}>
        <label htmlFor="Romance">Romance </label>
        <input name="genre" type="checkbox" value="Romance" onChange={(e) => {handleCheck(e)}} />
      </div>
      <div className={styles.genre}>
        <label htmlFor="Thriller">Thriller </label>
        <input name="genre" type="checkbox" value="Thriller" onChange={(e) => {handleCheck(e)}} />
      </div>
      <div className={styles.genre}>
        <label htmlFor="Science Fiction">Science Fiction</label>
        <input name="genre" type="checkbox" value="Science Fiction" onChange={(e) => {handleCheck(e)}} />
      </div>
    </div>
  )
}

export default Genres 