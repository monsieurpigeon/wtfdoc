import styles from "./trending.module.css";
import { format } from "date-fns";

export default function Trending() {
  const now = Date.now().toString();
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>TRENDING</div>
      {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((i) => {
        const compare = parseInt(
          (parseInt(now.slice(0, -i)) + 1 + "0000000000000").slice(0, 13)
        );
        return (
          <a href={`/${now.slice(0, -i)}`} className={styles.line}>
            <div className={styles.expiration}>{format(new Date(compare), "MM/dd/yyyy hh:mm:ss:SS")}</div>
            <div>{now.slice(0, -i)}</div>
          </a>
        );
      })}
    </div>
  );
}
