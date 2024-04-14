"use client";
import {
  useEffect,
  useRef,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";
import axios from "axios";

export function TwoPendulums() {
  const [isWaitingToStart, setIsWaitingToStart] = useState(true);
  const readyCount = useRef(0);

  const startAnimation = () => {
    readyCount.current += 1;
    if (readyCount.current == 2) {
      setIsWaitingToStart(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", margin: "10px" }}>
      <PendulumContainer
        isWaitingToStart={isWaitingToStart}
        color="lightgreen"
        onReady={startAnimation}
        pendulumParams={{
          initialAngle: 0,
          initialSpeed: 2,
          timeStep: 4,
          pendulumType: PendulumType.ODE,
        }}
      />
      <PendulumContainer
        isWaitingToStart={isWaitingToStart}
        color="aquamarine"
        onReady={startAnimation}
        pendulumParams={{
          initialAngle: 0,
          initialSpeed: 2,
          timeStep: 4,
          pendulumType: PendulumType.Approximation,
        }}
      />
    </div>
  );
}

export function PendulumContainer({
  isWaitingToStart,
  color,
  onReady,
  pendulumParams: { initialAngle, initialSpeed, timeStep, pendulumType },
}: PendulumContainerProps) {
  const [angle, setAngle] = useState(0);
  const data = useRef<Data>([]);
  const [isReady, setIsReady] = useState(false);
  const job = useRef<{ job: number }>({ job: -1 });

  useEffect(() => {
    cancelAnimationFrame(job.current.job);
    const endpoint =
      pendulumType == PendulumType.ODE
        ? "ode"
        : pendulumType == PendulumType.Approximation
        ? "approx"
        : "ode";
    const queryParam = `initialAngle=${initialAngle}&initialSpeed=${initialSpeed}&timeStep=${timeStep}`;
    axios
      .get(`http://localhost:5068/pendulum/${endpoint}?${queryParam}`)
      .then((response) => {
        data.current = response.data;
      })
      .then(() => {
        onReady && onReady();
        setIsReady(true);
      });
  }, [initialAngle, initialSpeed, timeStep, pendulumType, onReady]);

  useEffect(() => {
    cancelAnimationFrame(job.current.job);
    if (!isWaitingToStart && isReady) {
      job.current = startLoop(data.current, setAngle);
    }
    return () => {
      const jobNumber = job.current.job;
      if (jobNumber != -1) {
        cancelAnimationFrame(jobNumber);
      }
    };
  }, [isWaitingToStart, isReady]);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", margin: "10px" }}>
      <Pendulum color={color} angle={angle} />
    </div>
  );
}

interface PendulumContainerProps {
  isWaitingToStart: boolean;
  color: string;
  onReady?: () => void;
  pendulumParams: {
    initialAngle: number;
    initialSpeed: number;
    timeStep: number;
    pendulumType: PendulumType;
  };
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

export const enum PendulumType {
  ODE,
  Approximation,
  Default,
}
