import Gun from "gun/gun";
import styles from "./WTFTextInput.module.css";
import { useEffect, useState } from "react";
const gun = Gun("https://wtfdoc.herokuapp.com/gun");

export default function WTFTextInput({ board }) {
  const [title, setTitle] = useState("");
  const BOARD = board;

  useEffect(() => {
    gun.get(BOARD).on((state) => {
      if (!state.title) state.title = "";
      const tmpTitle = state.title.replace(/(?:\r\n|\r|\\n)/g, '\n');
      setTitle(tmpTitle);
      (document.getElementById('input') as HTMLInputElement).value= tmpTitle;
    }, true);
    (document.getElementById('title') as HTMLInputElement).style.display = "block";
    (document.getElementById('update') as HTMLInputElement).style.display = "none";
    (document.getElementById('input') as HTMLInputElement).style.display = "none";
  }, []);

  const updateTitle = (event) => {
    event.preventDefault();
    const title = event.target.input.value
    gun.get(BOARD).put({ title });
    setTitle(title);
    (document.getElementById('title') as HTMLInputElement).style.display = "block";
    (document.getElementById('update') as HTMLInputElement).style.display = "none";
    (document.getElementById('input') as HTMLInputElement).style.display = "none";
  };

  const revealEdit = (event) => {
    event.preventDefault();
    (document.getElementById('title') as HTMLInputElement).style.display = "none";
    (document.getElementById('update') as HTMLInputElement).style.display = "block";
    (document.getElementById('input') as HTMLInputElement).style.display = "block";
  }

  //   const handleAddOne = () => {
  //     setNumber(number + 1);
  //     gun.get(BOARD).put({ number: number + 1 });
  //   };

  //   const handleSubtractOne = () => {
  //     setNumber(number - 1);
  //     gun.get(BOARD).put({ number: number - 1 });
  //   };
  console.log(title);
  return (
    <form onSubmit={updateTitle}>
      <button onClick={revealEdit} className={styles.edit}>Edit</button>
      <div id="title" className={styles.htmlTitle} dangerouslySetInnerHTML={{ __html: title }} />
      <textarea id="input" className={styles.textarea} required />
      <button id="update" className={styles.update} type="submit">Update</button>
    </form>
  );
}
