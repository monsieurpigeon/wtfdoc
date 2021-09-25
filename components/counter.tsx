export default function Counter({ number, plusOne, minusOne }) {
  return (
    <>
      <h2>{number}</h2>
      <button onClick={minusOne}>Subtract 1</button>
      <button onClick={plusOne}>Add 1</button>
    </>
  );
}
