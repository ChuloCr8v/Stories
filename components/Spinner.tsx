
import styles from '../styles/Spinner.module.scss'
import Image from 'next/image'
import spinnerIcon from '../assets/load.png'

const Spinner = () => { 
  return ( 
      <section className={styles.spinner}>
       <Image src={spinnerIcon} className={styles.spinner_icon} height={20} width={20} />
      </section>
    ); 
  }; 
  
export default Spinner