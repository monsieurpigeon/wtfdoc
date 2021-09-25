import Gun from "gun/gun";

import { useEffect, useState } from "react";
const gun = Gun("https://wtfdoc.herokuapp.com/gun");

export default function Counter({board}) {
  const [number, setNumber] = useState(0);
  const BOARD = board

  useEffect(() => {
    gun.get(BOARD).on((state) => {
      console.log(state)
      setNumber(state.number);
    }, true);
  }, [])
 

  const handleAddOne = () => {
    setNumber(number + 1);
    gun.get(BOARD).put({ number: number + 1 });
  };

  const handleSubtractOne = () => {
    setNumber(number - 1);
    gun.get(BOARD).put({ number: number - 1 });
  };
  return (
    <>
      <h2>{number}</h2>
      <button onClick={handleSubtractOne}>Subtract 1</button>
      <button onClick={handleAddOne}>Add 1</button>
    </>
  );
}
