import styles from "../styles/Footer.module.scss";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { FaTwitter, FaFacebook } from "react-icons";
import { useEffect } from "react";
import Link from "next/link";

const Footer = () => {

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer_content}>
          <div className={styles.logo_container}>
            <div className={styles.logo}>
              <Link href="/">
                <a className={styles.footer_logo}>
                  Poet<span>eet</span>
                </a>
              </Link>
            </div>
            <p className={styles.description}>
              Crypto WallStreet is the place to get your hands on some of the
              latest cryptocurrency trends, news and market data.
            </p>
          </div>
          <div className={styles.footer_section} id={styles.col_2}>
            <h3 className={styles.section_title}>
              Menu{" "}
            </h3>
            <Link href="/">
              <a className={styles.footer_menu_item}>Home</a>
            </Link>
            <Link href="/cryptocurrencies">
              <a className={styles.footer_menu_item}>Cryptocurrencies</a>
            </Link>
            <Link href="/exchanges">
              <a className={styles.footer_menu_item}>Exchanges</a>
            </Link>
          </div>

          <div className={styles.footer_section} id={styles.newsletter}>
            <h3 className={styles.section_title}>
              Newsletter{" "}
            </h3>
            <form
              action="/"
              method="POST"
              className={styles.form}
            >
              <input type="email" required placeholder="Your Email Address" />
              <input type="submit" value="Subscribe" />
            </form>
            {/*   <div className={styles.socials}>
              <FaTwitter className={styles.icon} />
              <FaFacebook className={styles.icon} />
            </div> */}
          </div>
        </div>
        <div className={styles.footer_credits}>
          <p className={styles.credits}>
            {" "}
            Designed and built by
            <span>
              <a href="https://devc.tech"> Devc.tech</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer 