import styles from "./trending.module.css";
import Link from "next/link";

export default function Trending() {
  const now = Date.now().toString();
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>TRENDING</div>
      {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((i) => {
        return (
          <a href={`/${now.slice(0, -i)}`} style={{ marginLeft: 150 - 10 *i }} className={styles.line}>
            {now.slice(0, -i)}
          </a>
        );
      })}
    </div>
  );
}
