"use client";
import {
  useEffect,
  useRef,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";
import axios from "axios";

const POINT_FRAME_DURATION = 2;

export function PendulumContainer({
  start = true,
  color,
  onReady,
  pendulumParams: {
    initialAngle,
    initialSpeed,
    pendulumType,
    length = 1,
    acceleration,
  },
  ballDiameter = 48,
}: PendulumContainerProps) {
  const [angle, setAngle] = useState(initialAngle);
  const data = useRef<Data>({
    id: "",
    solution: { headLocation: [], loopLocation: [] },
  });
  const [isReady, setIsReady] = useState(false);
  const job = useRef<{ job: number }>({ job: -1 });

  useEffect(() => {
    setIsReady(false);

    const timeStep = POINT_FRAME_DURATION;
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
        onReady && onReady(data.current.id);
        setIsReady(true);
      })
      .catch((error) => {
        console.error(
          "Failed to fetch pendulum data or to get frame duration",
          error
        );
      });

    return () => {
      const jobNumber = job.current.job;
      if (jobNumber != -1) {
        cancelAnimationFrame(jobNumber);
      }
    };
  }, [onReady, initialAngle, initialSpeed, pendulumType, length, acceleration]);

  useEffect(() => {
    if (start && isReady) {
      job.current = startLoop(data.current.solution, setAngle);
    }
    return () => {
      const jobNumber = job.current.job;
      if (jobNumber != -1) {
        cancelAnimationFrame(jobNumber);
      }
    };
  }, [start, isReady]);

  return (
    <Pendulum
      color={color}
      angle={angle}
      length={length}
      ballDiameter={ballDiameter}
    />
  );
}

export function MyPendulumContainer({
  start = true,
  color,
  onReady,
  argData,
  initialAngle,
  ballDiameter = 48,
}: {
  start: boolean;
  color: string;
  onReady: (id: string) => void;
  argData: Data | null;
  initialAngle: number;
  ballDiameter?: number;
}) {
  const [angle, setAngle] = useState(initialAngle);
  const data = useRef<Data>({
    id: "",
    solution: { headLocation: [], loopLocation: [] },
  });
  const [isReady, setIsReady] = useState(false);
  const job = useRef<{ job: number }>({ job: -1 });

  useEffect(() => {
    setIsReady(false);

    if (argData !== null) {
      data.current = argData;
      onReady && onReady(data.current.id);
      setIsReady(true);
    }

    return () => {
      const jobNumber = job.current.job;
      if (jobNumber != -1) {
        cancelAnimationFrame(jobNumber);
      }
    };
  }, [onReady, argData]);

  useEffect(() => {
    if (start && isReady) {
      job.current = startLoop(data.current.solution, setAngle);
    }
    return () => {
      const jobNumber = job.current.job;
      if (jobNumber != -1) {
        cancelAnimationFrame(jobNumber);
      }
    };
  }, [start, isReady]);

  return (
    <Pendulum
      color={color}
      angle={angle}
      length={1}
      ballDiameter={ballDiameter}
    />
  );
}

interface PendulumContainerProps {
  start?: boolean;
  color: string;
  onReady?: (id: string) => void;
  pendulumParams: PendulumParams;
  ballDiameter?: number;
}

interface PendulumParams {
  initialAngle: number;
  initialSpeed: number;
  pendulumType: PendulumType;
  length?: number;
  acceleration?: number;
}

function Pendulum({ color, angle, length, ballDiameter }: PendulumProps) {
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
          width: `${ballDiameter}px`,
          height: `${ballDiameter}px`,
        }}
        className="rounded-full bg-black border-4 border-black transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

interface PendulumProps {
  color: string;
  angle: number;
  length?: number;
  ballDiameter: number;
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

export type Data = {
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
