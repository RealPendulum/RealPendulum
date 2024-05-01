"use client";
import { useEffect, useState } from "react";
import { printEveryFrame } from "@/app/refreshFrequency";
import "@/app/globals.css";
import NavigationBar from "@/app/navigation";
import { TwoPendulums } from "./pendulum";
import Urls from "@/urls";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto">
        <NavigationBar currentSiteUrl={Urls.homeURL} />
        <FpsCounter />
        <div className="flex justify-center">
          <TwoPendulums />
        </div>
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
    <div className="w-12 h-12 bg-blue-600 text-white text-3xl">
      {fpsValue.toFixed(0)}
    </div>
  );
}
