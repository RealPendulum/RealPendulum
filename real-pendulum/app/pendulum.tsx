"use client";
import {
  useEffect,
  useRef,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";
import axios from "axios";
import { getFrameDuration } from "./framerate";
import { time } from "console";

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
  pendulumParams: {
    initialAngle,
    initialSpeed,
    pendulumType,
    length,
    acceleration,
  },
}: PendulumContainerProps) {
  const [angle, setAngle] = useState(initialAngle);
  const data = useRef<Data>({ id: "", solution: { points: [], loopStart: 0 } });
  const [isReady, setIsReady] = useState(false);
  const job = useRef<{ job: number }>({ job: -1 });
  const frameDuration = useRef<number>(-1);

  useEffect(() => {
    cancelAnimationFrame(job.current.job);
    setIsReady(false);
    const timeStepRequest =
      frameDuration.current == -1
        ? getFrameDuration()
        : Promise.resolve(frameDuration.current);

    timeStepRequest.then((timeStepValue) => {
      frameDuration.current = timeStepValue;
      const timeStep = Math.round(timeStepValue / 2);
      const endpoint =
        pendulumType == PendulumType.ODE
          ? "ode"
          : pendulumType == PendulumType.Approximation
          ? "approx"
          : pendulumType == PendulumType.Random
          ? "random"
          : "ode";
      let queryParam = `initialAngle=${initialAngle}&initialSpeed=${initialSpeed}&timeStep=${timeStep}`;

      if (length !== undefined) {
        queryParam += `&length=${length}`;
      }

      if (acceleration !== undefined) {
        queryParam += `&acceleration=${acceleration}`;
      }

      axios
        .get(`http://localhost:5068/pendulum/${endpoint}?${queryParam}`)
        .then((response) => {
          data.current = response.data;
          onReady && onReady();
          setIsReady(true);
        });
    });
  }, [
    initialAngle,
    initialSpeed,
    frameDuration,
    pendulumType,
    length,
    acceleration,
    onReady,
  ]);

  useEffect(() => {
    cancelAnimationFrame(job.current.job);
    if (!isWaitingToStart && isReady) {
      job.current = startLoop(data.current.solution, setAngle);
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
    pendulumType: PendulumType;
    length?: number;
    acceleration?: number;
  };
}

function Pendulum({ color, angle }: { color: string; angle: number }) {
  return (
    <div
      style={{
        transform: `rotate(${angle}rad)`,
      }}
      className="absolute origin-top-left"
    >
      <div
        style={{
          backgroundColor: color,
        }}
        className={
          "absolute w-5 h-5 rounded-full bg-black border-4 border-black transform -translate-x-1/2 -translate-y-1/2 z-10"
        }
      />
      <div className="w-1 h-72 bg-black transform -translate-x-1/2" />
      <div
        style={{
          backgroundColor: color,
        }}
        className="w-12 h-12 rounded-full bg-black border-4 border-black transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

function startLoop(
  solution: Solution,
  setAngle: Dispatch<SetStateAction<number>>
): { job: number } {
  let startTimestamp = performance.now();
  let frame = 0;
  const dataLength = solution.points.length;
  const loopStart = solution.loopStart == -1 ? 0 : solution.loopStart;
  let job = { job: requestAnimationFrame(loop) };

  return job;

  function loop() {
    const timestamp = performance.now();
    const userTime = (timestamp - startTimestamp) / 1000;
    const timeAtLoopStart = solution.points[loopStart].time;

    if (frame >= solution.loopStart) {
      while (solution.points[frame].time - timeAtLoopStart <= userTime) {
        frame = frame + 1;
        if (frame >= dataLength) {
          frame = solution.loopStart;
          startTimestamp = timestamp;
          break;
        }
      }
    } else {
      while (solution.points[frame].time <= userTime) {
        frame = frame + 1;
      }
      if (frame >= solution.loopStart) {
        startTimestamp = timestamp;
      }
    }

    const angle = solution.points[frame].value;
    setAngle(angle);
    job.job = requestAnimationFrame(loop);
  }
}

type Data = {
  id: string;
  solution: Solution;
};

type Solution = {
  points: { time: number; value: number }[];
  loopStart: number;
};

export const enum PendulumType {
  ODE = "ODE",
  Approximation = "Approximation",
  Default = "Default",
  Random = "Random",
}
