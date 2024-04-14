"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { printEveryFrame } from "../app/refreshFrequency";
import "../app/globals.css";
import Link from "next/link";
import Urls from "../urls";
import { TwoPendulums } from "./pendulum";

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
      <TwoPendulums />
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
