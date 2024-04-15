"use client";
import { useEffect, useState } from "react";
import { printEveryFrame } from "../app/refreshFrequency";
import "../app/globals.css";
import Link from "next/link";
import Urls from "../urls";
import { Pendulums } from "./pendulum";

function DesktopNavLinks() {
  return (
    <nav>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Button
      </button> */}
      <div className="flex flex-row justify-center">
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
            className="m-3 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600"
          >
            {title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Home() {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        <Pendulums />
      </div>
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
        width: "80px",
        height: "80px",
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
