import { FC, useState, useEffect } from "react";
import styles from "../styles/Heading.module.scss";

interface Props {
  Heading: string;
  Subheading?: string;
}

const Heading: FC<Props> = (props) => {
 
  return (
    <div className={styles.heading}>
      <h1 className={styles.heading_text}>
        {props.heading}
      </h1>
    </div>
  );
};

export default Heading;
   