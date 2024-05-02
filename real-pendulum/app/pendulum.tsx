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
    <div className="w-80 h-80">
      <div className="absolute left-1/2">
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
      </div>
      <div className="absolute left-1/2">
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
    </div>
  );
}

export function PendulumContainer({
  isWaitingToStart,
  color,
  onReady,
  pendulumParams: { initialAngle, initialSpeed, timeStep, pendulumType },
}: PendulumContainerProps) {
  const [angle, setAngle] = useState(initialAngle);
  const data = useRef<Data>({ points: [], loopStart: 0 });
  const [isReady, setIsReady] = useState(false);
  const job = useRef<{ job: number }>({ job: -1 });

  useEffect(() => {
    cancelAnimationFrame(job.current.job);
    const endpoint =
      pendulumType == PendulumType.ODE
        ? "ode"
        : pendulumType == PendulumType.Approximation
        ? "approx"
        : pendulumType == PendulumType.Random
        ? "random"
        : "ode";
    console.log(endpoint);
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

  return <Pendulum color={color} angle={angle} />;
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
        position: "absolute",
        transform: `rotate(${angle}rad)`,
        transformOrigin: "top left",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: color,
          borderColor: "black",
          borderWidth: "4px",
          transform: `translate(-50%, -50%)`,
          zIndex: 1,
        }}
      />
      <div
        style={{
          width: "4px",
          height: "300px",
          backgroundColor: "black",
          transform: `translate(-50%, 0)`,
        }}
      />
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: color,
          left: "-23px",
          top: "295px",
          borderWidth: "4px",
          borderColor: "black",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

function startLoop(
  data: Data,
  setAngle: Dispatch<SetStateAction<number>>
): { job: number } {
  let startTimestamp = performance.now();
  let frame = 0;
  const dataLength = data.points.length;
  let job = { job: requestAnimationFrame(loop) };
  return job;

  function loop() {
    const timestamp = performance.now();
    const userTime = (timestamp - startTimestamp) / 1000;
    const timeAtLoopStart = data.points[data.loopStart].time;

    if (frame >= data.loopStart) {
      while (data.points[frame].time - timeAtLoopStart <= userTime) {
        frame = frame + 1;
        if (frame >= dataLength) {
          frame = data.loopStart;
          startTimestamp = timestamp;
          break;
        }
      }
    } else {
      while (data.points[frame].time <= userTime) {
        frame = frame + 1;
      }
      if (frame >= data.loopStart) {
        startTimestamp = timestamp;
      }
    }

    const angle = data.points[frame].value;
    setAngle(angle);
    job.job = requestAnimationFrame(loop);
  }
}

type Data = {
  points: {
    time: number;
    value: number;
  }[];
  loopStart: number;
};

export const enum PendulumType {
  ODE,
  Approximation,
  Default,
  Random,
}
