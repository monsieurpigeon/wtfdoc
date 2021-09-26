import Gun from "gun/gun";
import styles from "./WTFTextInput.module.css";
import { useEffect, useState } from "react";
const gun = Gun("https://wtfdoc.herokuapp.com/gun");

export default function WTFTextInput({ board }) {
  const [title, setTitle] = useState("");
  const BOARD = board;

  useEffect(() => {
    gun.get(BOARD).on((state) => {
      console.log(state);
      setTitle(state.title);
      (document.getElementById('title') as HTMLInputElement).value = state.title;
    }, true);
  }, []);

  const updateTitle = (event) => {
    event.preventDefault();
    const title = event.target.title.value
    gun.get(BOARD).put({ title });
    setTitle(title);
  };

  //   const handleAddOne = () => {
  //     setNumber(number + 1);
  //     gun.get(BOARD).put({ number: number + 1 });
  //   };

  //   const handleSubtractOne = () => {
  //     setNumber(number - 1);
  //     gun.get(BOARD).put({ number: number - 1 });
  //   };
  return (
    <form onSubmit={updateTitle}>
      <label className={styles.title} htmlFor="title">{title}</label>
      <textarea className={styles.textarea} id="title" required />
      <button type="submit">Update</button>
    </form>
  );
}
