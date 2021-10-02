import Gun from "gun/gun";
import styles from "./chat.module.css";
import Chatbox from "./chatbox";
const gun = Gun("https://wtfdoc.herokuapp.com/gun");

export default function Chat({ board }) {
  console.log(board);
  return (
    <div className={styles.title}>
      <h2>Chat</h2>
      <Chatbox board={board} />
      <br />
      <hr />
    </div>
  );
}
