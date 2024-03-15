"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Home() {
  // const [backgroundColor, setBackgroundColor] = useState("black");
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: "#e5ddf0",
      }}
    >
      {/* <button onClick={() => setBackgroundColor("red")}>Red</button> */}
      {/* <Counter backgroundColor={backgroundColor} /> */}
      <Pendulums />
    </div>
  );
}

// function Counter({ backgroundColor }) {
//   const [count, setCount] = useState(0);

//   function increment() {
//     setCount(count + 1);
//     console.log(count);
//   }

//   return (
//     <div style={{ backgroundColor }}>
//       <h1>{count}</h1>
//       {/* <button onClick={() => setCount(count + 1)}>Increment</button>
//        */}
//       <button onClick={increment}>Increment</button>
//     </div>
//   );
// }

function Pendulums() {
  const [angles, setAngles] = useState({
    exactODE: 0,
    approxODE: 0,
    approx: 0,
  });
  const startTimestamp = useRef(0);
  const dataLength = useRef(0);
  const exactODEData = useRef<any>(null);
  const approxODEData = useRef<any>(null);
  const approxData = useRef<any>(null);

  const frame = useRef(0);

  function loop() {
    const timestamp = performance.now();
    if (startTimestamp.current === 0) {
      startTimestamp.current = timestamp;
    }
    // console.log(frame.current, dataLength.current);
    if (frame.current >= dataLength.current) {
      return;
    }

    const userTime = (timestamp - startTimestamp.current) / 1000;
    while (exactODEData.current[frame.current].time <= userTime) {
      frame.current = frame.current + 1;
    }

    const currentExactODEAngle = exactODEData.current[frame.current].value;
    const currentApproxOdeAngle = approxODEData.current[frame.current].value;
    const currentApproxAngle = approxData.current[frame.current].value;

    setAngles({
      exactODE: currentExactODEAngle,
      approxODE: currentApproxOdeAngle,
      approx: currentApproxAngle,
    });

    requestAnimationFrame(loop);
  }

  useEffect(() => {
    const initialAngle = 0;
    const initialSpeed = 2;
    const queryParam = `initialAngle=${initialAngle}&initialSpeed=${initialSpeed}`;
    axios
      .get(`http://localhost:5068/pendulum/ode?${queryParam}`)
      .then((response) => {
        exactODEData.current = response.data;
        // data = response.data;
      })
      .then(() => {
        return axios.get(
          `http://localhost:5068/pendulum/ode?isExact=false&${queryParam}`
        );
      })
      .then((response) => {
        approxODEData.current = response.data;
      })
      .then(() => {
        return axios.get(`http://localhost:5068/pendulum/approx?${queryParam}`);
      })
      .then((response) => {
        approxData.current = response.data;
        dataLength.current = response.data.length - 1;
        requestAnimationFrame(loop);
      });
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <Pendulum color="lightgreen" angle={angles.exactODE} />
      <Pendulum color="aquamarine" angle={angles.approx} />
    </div>
  );
}

function Pendulum({ color, angle }: { color: string; angle: number }) {
  return (
    <div
      style={{
        width: 900,
        height: 900,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `rotate(${angle}rad)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "400px",
            backgroundColor: "black",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: color,
            left: "-23px",
            top: "395px",
            borderWidth: "4px",
            borderColor: "black",
          }}
        />
      </div>
    </div>
  );
}
