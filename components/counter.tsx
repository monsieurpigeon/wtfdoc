import Gun from "gun/gun";
import styles from "./counter.module.css";
import { useEffect, useState } from "react";
const gun = Gun("https://wtfdoc.herokuapp.com/gun");

export default function Counter({ board }) {
  const [counter, setCounter] = useState(0);
  const BOARD = board;

  useEffect(() => {
    gun.get(BOARD).on((state) => {
      console.log(state);
      if (!state.counter) state.counter = 0;
      setCounter(state.counter);
    }, true);
  }, []);

  const handleAddOne = () => {
    gun.get(BOARD).put({ counter: counter + 1 });
    setCounter(counter + 1);
  };

  const handleSubtractOne = () => {
    gun.get(BOARD).put({ counter: counter - 1 });
    setCounter(counter - 1);
  };
  return (
    <div className={`${styles.wrapper}`}>
      <button className={`${styles.plusOne} ${styles.buttonVote}`} onClick={handleAddOne}>+</button>
      <div className={`${styles.number}`}>{counter}</div>
      <button className={`${styles.minusOne} ${styles.buttonVote}`} onClick={handleSubtractOne}>-</button>
    </div>
  );
}
