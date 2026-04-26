import { useRef, useState } from "react";

export function UseRefCounter() {
  const [count, setCount] = useState(1);
  const ref = useRef(1);
  const incCount = () => setCount(c => c + 1);
  const incRef = () => {
      ref.current++;
      console.log('ref: ' + ref.current);
  }
  return (
    <div className="App">
      <button onClick={incCount}>count: {count}</button>
      <hr />
      {/* eslint-disable-next-line react-hooks/refs */}
      <button onClick={incRef}>ref.current: {ref.current}</button>
    </div>
  );
  
}
