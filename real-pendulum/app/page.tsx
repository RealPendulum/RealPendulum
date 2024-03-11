"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Home() {
  // function loop() {
  //   console.log(performance.now());
  //   timestamps.current.push(performance.now());
  //   console.log(
  //     "current framerate",
  //     (1000 /
  //       (timestamps.current[timestamps.current.length - 1] -
  //         timestamps.current[0])) *
  //       timestamps.current.length
  //   );
  //   if (counter.current++ < 100) requestAnimationFrame(loop);
  // }
  // requestAnimationFrame(loop);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <Pendulums />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}

function RealPendulum({
  run,
  setRun,
}: {
  run: boolean;
  setRun: (run: boolean) => void;
}) {
  const [angle, setAngle] = useState(0);
  const data = useRef<any>(null);
  const frame = useRef(0);

  function callSetPosition() {
    if (frame.current >= data.current.length) {
      return;
    }
    const angle = data.current[frame.current].value;

    setAngle(angle);

    frame.current = frame.current + 1;
    requestAnimationFrame(callSetPosition);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5068/ode")
      .then((response) => {
        console.log("fetch");
        data.current = response.data;
      })
      .then(() => {
        setRun(true);
        requestAnimationFrame(callSetPosition);
      });
  }, []);

  return <Pendulum color="red" angle={angle} />;
}

function FakePendulum({ run }: { run: boolean }) {
  const [angle, setAngle] = useState(0);
  const data = useRef<any>(null);
  const start = useRef(0);

  function callSetPosition() {
    if (start.current === 0) {
      start.current = performance.now();
    }
    const time = (performance.now() - start.current) / 1000;
    const initialSpeed = 0.1;
    const omega = Math.sqrt(9.81);
    const A = Math.sqrt(initialSpeed / omega);
    setAngle(A * Math.sin(omega * time));
    requestAnimationFrame(callSetPosition);
  }

  useEffect(() => {
    if (run) {
      requestAnimationFrame(callSetPosition);
    }
  }, [run]);

  return <Pendulum color="blue" angle={angle} />;
}

function Pendulum({ color, angle }: { color: string; angle: number }) {
  return (
    <div
      style={{
        transform: `rotate(${angle}rad)`,
        opacity: 0.5,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "4px",
          height: "400px",
          backgroundColor: "white",
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
        }}
      />
    </div>
  );
}

function Pendulums() {
  // const [realAngle, setRealAngle] = useState(0);
  // const [fakeAngle, setFakeAngle] = useState(0);
  // const [localAngle, setLocalAngle] = useState(0);
  const [angles, setAngles] = useState({ real: 0, fake: 0, local: 0 });
  const dataLength = useRef(0);
  const realData = useRef<any>(null);
  const fakeData = useRef<any>(null);

  const frame = useRef(0);

  function loop() {
    if (frame.current >= dataLength.current) {
      return;
    }

    // const time = (timestamp - startTime.current) / 1000;
    const initialSpeed = 2;
    const omega = Math.sqrt(9.81);
    const A = initialSpeed / omega;

    const currentRealAngle = realData.current[frame.current].value;
    const currentFakeAngle = fakeData.current[frame.current].value;
    const time = realData.current[frame.current].time;
    const currentLocalAngle = A * Math.sin(omega * time);

    frame.current = frame.current + 1;

    console.log(currentRealAngle, currentFakeAngle, currentLocalAngle);

    setAngles({
      real: currentRealAngle,
      fake: currentFakeAngle,
      local: currentLocalAngle,
    });

    requestAnimationFrame(loop);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5068/realode")
      .then((response) => {
        dataLength.current = response.data.length;
        realData.current = response.data;
      })
      .then(() => {
        return axios.get("http://localhost:5068/fakeode");
      })
      .then((response) => {
        fakeData.current = response.data;
        requestAnimationFrame(loop);
      });
  }, []);

  return (
    <div>
      <Pendulum color="yellow" angle={angles.real} />
      <Pendulum color="blue" angle={angles.fake} />
      <Pendulum color="green" angle={angles.local} />
    </div>
  );
}
