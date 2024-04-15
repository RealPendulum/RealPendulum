"use client";
import { useEffect, useState } from "react";
import { printEveryFrame } from "../app/refreshFrequency";
import "../app/globals.css";
import Link from "next/link";
import Urls from "../urls";
import { TwoPendulums } from "./pendulum";

export function Home() {
  return (
    <div className="w-100vh h-100vh bg-gray-200">
      <DesktopNavLinks />
      <FpsCounter />
      <div className="flex flex-row justify-center">
        <TwoPendulums />
      </div>
    </div>
  );
}

function DesktopNavLinks() {
  return (
    <nav>
      <div className="flex flex-row justify-center p-3">
        {[
          ["Home", Urls.homeURL],
          ["Info", Urls.infoURL],
          ["Game", Urls.gameURL],
          ["Examples", Urls.examplesURL],
          ["Contact", Urls.contactURL],
        ].map(([title, url]) => (
          <Link
            href={url}
            key={title}
            className="m-3 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-800 transition duration-200 hover:scale-125"
          >
            {title}
          </Link>
        ))}
      </div>
    </nav>
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
    <div className="w-12 h-12 bg-blue-600 text-white text-3xl">
      {fpsValue.toFixed(0)}
    </div>
  );
}
