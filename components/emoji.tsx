import Gun from "gun/gun";
import { useEffect, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import styles from "./emoji.module.css";
import { Picker } from "emoji-mart";

const gun = Gun("https://wtfdoc.herokuapp.com/gun");

export default function Emoji({ board }) {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const BOARD = board;
  useEffect(() => {
    gun
      .get(BOARD)
      .get("emoji")
      .on((state) => {
        setChosenEmoji(state);
        (document.getElementById("display") as HTMLInputElement).value = state;
      }, true);
    (document.getElementById("picker") as HTMLInputElement).style.display =
      "none";
    (document.getElementById("display") as HTMLInputElement).style.display =
      "block";
  }, []);

  const addEmoji = (emoji) => {
    setChosenEmoji(emoji.native);
    console.log(emoji.native);
    gun.get(BOARD).get("emoji").put(emoji.native);
    (document.getElementById("picker") as HTMLInputElement).style.display =
      "none";
    (document.getElementById("display") as HTMLInputElement).style.display =
      "block";
  };

  const openEmojiPicker = (event) => {
    (document.getElementById("picker") as HTMLInputElement).style.display =
      "block";
    (document.getElementById("display") as HTMLInputElement).style.display =
      "none";
  };

  return (
    <div className={styles.wrapper}>
      <button id="display" className={styles.button} onClick={openEmojiPicker}>
        {chosenEmoji}
      </button>
      <div className={styles.picker} id="picker">
        <Picker emoji="point_up" title="Pick your emoji…" onSelect={addEmoji} />
      </div>
    </div>
  );
}
