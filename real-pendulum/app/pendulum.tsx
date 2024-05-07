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
  const data = useRef<Data>({
    id: "",
    solution: { headLocation: [], loopLocation: [] },
  });
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

  return <Pendulum color={color} angle={angle} length={length ?? 1} />;
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

function Pendulum({ color, angle, length }: PendulumProps) {
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
      <div
        className="w-1  bg-black transform -translate-x-1/2"
        style={{
          height: (length ?? 1) * 18 + "rem",
        }}
      />
      <div
        style={{
          backgroundColor: color,
        }}
        className="w-12 h-12 rounded-full bg-black border-4 border-black transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

interface PendulumProps {
  color: string;
  angle: number;
  length?: number;
}

function startLoop(
  solution: Solution,
  setAngle: Dispatch<SetStateAction<number>>
): { job: number } {
  let startTimestamp = performance.now();
  let frame = 0;
  const { headLocation, loopLocation } = solution;

  let job: { job: number } = { job: -1 };
  if (headLocation.length > 0) {
    requestAnimationFrame(headLoop);
  } else if (loopLocation.length > 0) {
    requestAnimationFrame(loopLoop);
  }

  return job;

  function headLoop() {
    const timestamp = performance.now();
    const userTime = (timestamp - startTimestamp) / 1000;

    while (headLocation[frame].time <= userTime) {
      ++frame;
      if (frame >= headLocation.length) {
        if (loopLocation.length > 0) {
          startTimestamp = timestamp;
          frame = 0;
          loopLoop();
        }
        return;
      }
    }

    const angle = headLocation[frame].value;
    setAngle(angle);
    job.job = requestAnimationFrame(headLoop);
  }

  function loopLoop() {
    const timestamp = performance.now();
    const userTime = (timestamp - startTimestamp) / 1000;

    while (loopLocation[frame].time <= userTime) {
      ++frame;
      if (frame >= loopLocation.length) {
        frame = 0;
        startTimestamp = timestamp;
        break;
      }
    }

    const angle = loopLocation[frame].value;
    setAngle(angle);
    job.job = requestAnimationFrame(loopLoop);
  }
}

type Data = {
  id: string;
  solution: Solution;
};

type Solution = {
  headLocation: { time: number; value: number }[];
  loopLocation: { time: number; value: number }[];
};

export const enum PendulumType {
  ODE = "ODE",
  Approximation = "Approximation",
  Default = "Default",
  Random = "Random",
}
