"use client";
import {
  useEffect,
  useRef,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";
import axios from "axios";
import { printEveryFrame } from "./refreshFrequency";
import { Pendulums } from "./pendulum";

function FpsCounter() {
  const [fpsValue, setFpsValue] = useState(0);

  useEffect(() => {
    const job = printEveryFrame(setFpsValue);
    return () => {
      cancelAnimationFrame(job.id);
    };
  }, []);

  return (
    <div
      style={{
        // position: "relative",
        // top: "0",
        // left: "50%",
        width: "20%",
        height: "20%",
        backgroundColor: "blue",
        color: "white",
        fontSize: "30px",
        // alignContent: "center",
      }}
    >
      {fpsValue.toFixed(0)}
    </div>
  );
}

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
        backgroundColor: "red",
        // justifyContent: "center",
        // alignContent: "center",
        // backgroundColor: "#e5ddf0",
      }}
    >
      <FpsCounter />
      <Pendulums />
    </div>
  );
}
