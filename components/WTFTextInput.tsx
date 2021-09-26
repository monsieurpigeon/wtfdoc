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
    (document.getElementById('title') as HTMLInputElement).style.display = "none";
    (document.getElementById('update') as HTMLInputElement).style.display = "none";
    (document.getElementById('label') as HTMLInputElement).style.display = "block";
  }, []);

  const updateTitle = (event) => {
    event.preventDefault();
    const title = event.target.title.value
    gun.get(BOARD).put({ title });
    setTitle(title);
    (document.getElementById('title') as HTMLInputElement).style.display = "none";
    (document.getElementById('update') as HTMLInputElement).style.display = "none";
    (document.getElementById('label') as HTMLInputElement).style.display = "block";
  };

  const revealEdit = (event) => {
    event.preventDefault();
    (document.getElementById('title') as HTMLInputElement).style.display = "block";
    (document.getElementById('update') as HTMLInputElement).style.display = "block";
    (document.getElementById('label') as HTMLInputElement).style.display = "none";
  }

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
      <button onClick={revealEdit} className={styles.edit}>Edit</button>
      <label id="label" className={styles.title} htmlFor="title">{title}</label>
      <textarea className={styles.textarea} id="title" required />
      <button id="update" className={styles.update} type="submit">Update</button>
    </form>
  );
}
