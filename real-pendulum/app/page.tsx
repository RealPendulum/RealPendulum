"use client";
import {
  useEffect,
  useRef,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";
import axios from "axios";

export default function Home() {
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
      <Pendulums />
    </div>
  );
}

function Pendulums() {
  const [exactODEAngle, setExactODEAngle] = useState(0);
  const [approxAngle, setApproxAngle] = useState(0);
  const dataLength = useRef(0);
  const exactODEData = useRef<Data>([]);
  const approxData = useRef<Data>([]);

  useEffect(() => {
    let isCancelled = false;
    const initialAngle = 0;
    const initialSpeed = 2;
    const timeStep = 4;
    const queryParam = `initialAngle=${initialAngle}&initialSpeed=${initialSpeed}&timeStep=${timeStep}`;
    let job = { job: 0 };
    axios
      .get(`http://localhost:5068/pendulum/ode?${queryParam}`)
      .then((response) => {
        exactODEData.current = response.data;
      })
      .then(() => {
        return axios.get(`http://localhost:5068/pendulum/approx?${queryParam}`);
      })
      .then((response) => {
        approxData.current = response.data;
        dataLength.current = response.data.length - 1;
        if (isCancelled) return;
        job = startLoop(exactODEData.current, setExactODEAngle);
        startLoop(approxData.current, setApproxAngle);
      });
    return () => {
      const jobNumber = job.job;
      isCancelled = true;
      cancelAnimationFrame(jobNumber);
    };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", margin: "10px" }}>
      <Pendulum color="lightgreen" angle={exactODEAngle} />
      <Pendulum color="aquamarine" angle={approxAngle} />
    </div>
  );
}

function Pendulum({ color, angle }: { color: string; angle: number }) {
  return (
    <div
      style={{
        width: 720,
        height: 720,
        position: "relative",
        borderWidth: "4px",
        borderColor: "white",
        borderRadius: "20%",
        margin: "10px",
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
            height: "300px",
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
            top: "295px",
            borderWidth: "4px",
            borderColor: "black",
          }}
        />
      </div>
    </div>
  );
}

function startLoop(
  data: Data,
  setAngle: Dispatch<SetStateAction<number>>
): { job: number } {
  let startTimestamp = performance.now();
  let frame = 0;
  const dataLength = data.length;
  let job = { job: requestAnimationFrame(loop) };
  return job;

  function loop() {
    const timestamp = performance.now();
    const userTime = (timestamp - startTimestamp) / 1000;

    while (data[frame].time <= userTime) {
      frame = frame + 1;
      if (frame >= dataLength) {
        frame = 0;
        startTimestamp = timestamp;
        break;
      }
    }

    const angle = data[frame].value;
    setAngle(angle);
    job.job = requestAnimationFrame(loop);
  }
}

type Data = { time: number; value: number }[];
