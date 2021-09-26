import Gun from "gun/gun";
import styles from "./counter.module.css";
import { useEffect, useState } from "react";
const gun = Gun("https://wtfdoc.herokuapp.com/gun");

export default function Counter({ board }) {
  const [number, setNumber] = useState(0);
  const BOARD = board;

  useEffect(() => {
    gun.get(BOARD).on((state) => {
      console.log(state);
      setNumber(state.number);
    }, true);
  }, []);

  const handleAddOne = () => {
    setNumber(number + 1);
    gun.get(BOARD).put({ number: number + 1 });
  };

  const handleSubtractOne = () => {
    setNumber(number - 1);
    gun.get(BOARD).put({ number: number - 1 });
  };
  return (
    <div className={`${styles.wrapper}`}>
      <button className={`${styles.plusOne} ${styles.buttonVote}`} onClick={handleAddOne}>+</button>
      <div className={`${styles.number}`}>{number}</div>
      <button className={`${styles.minusOne} ${styles.buttonVote}`} onClick={handleSubtractOne}>-</button>
    </div>
  );
}
