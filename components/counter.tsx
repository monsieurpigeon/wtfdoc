import Gun from "gun/gun";
import styles from "./counter.module.css";
import { useEffect, useState } from "react";
const gun = Gun("https://wtfdoc.herokuapp.com/gun");

export default function Counter({ board }) {
  const [counter, setCounter] = useState(0);
  const BOARD = board;

  useEffect(() => {
    gun.get(BOARD).get("counter").on((state) => {
      setCounter(state);
    }, true);
  }, []);

  const handleAddOne = () => {
    const tmp: any = counter + 1;
    gun.get(BOARD).get("counter").put(tmp);
    setCounter(tmp);
  };

  const handleSubtractOne = () => {
    const tmp: any = counter - 1;
    gun.get(BOARD).get("counter").put(tmp);
    setCounter(tmp);
  };
  return (
    <div className={`${styles.wrapper}`}>
      <button className={`${styles.plusOne} ${styles.buttonVote}`} onClick={handleAddOne}>+</button>
      <div className={`${styles.number}`}>{counter}</div>
      <button className={`${styles.minusOne} ${styles.buttonVote}`} onClick={handleSubtractOne}>-</button>
    </div>
  );
}
