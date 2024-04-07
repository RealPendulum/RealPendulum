"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { printEveryFrame } from "../app/refreshFrequency";
import "../app/globals.css";
import Link from "next/link";
import Urls from "../urls";

function DesktopNavLinks() {
  return (
    <nav>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Button
      </button> */}

      <div className="flex flex-row justify-center space-x-6">
        <div>
          <Link
            href="/"
            className="m-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600"
          >
            Home
          </Link>
        </div>

        <Link
          href={Urls.infoURL}
          className="m-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600"
        >
          Informacje
        </Link>

        <Link
          href={Urls.gameURL}
          className="m-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600"
        >
          Gra
        </Link>

        <Link
          href={Urls.examplesURL}
          className="m-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600"
        >
          Przykłady
        </Link>

        <Link
          href={Urls.contactURL}
          className="m-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600"
        >
          Kontakt
        </Link>
      </div>
    </nav>
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
        backgroundColor: "#e5ddf0",
        // justifyContent: "center",
        // alignContent: "center",
      }}
    >
      <DesktopNavLinks />
      <FpsCounter />
      <Pendulums />
    </div>
  );
}

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
