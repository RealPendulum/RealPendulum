import Urls from "@/app/urls";
import NavigationBar from "@/app/navigation";
import { useRef, useState } from "react";
import { PendulumContainer, PendulumType } from "@/app/pendulum";
import "@/app/globals.css";

export default function Game() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar currentSiteUrl={Urls.gameURL} />
      <div className="flex justify-center">
        <ThreePendulums />
      </div>
    </div>
  );
}

export function ThreePendulums() {
  const [isWaitingToStart, setIsWaitingToStart] = useState(true);
  const readyCount = useRef(0);

  const startAnimation = () => {
    readyCount.current += 1;
    if (readyCount.current == 3) {
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
      <div className="absolute left-1/2">
        <PendulumContainer
          isWaitingToStart={isWaitingToStart}
          color="lightcoral"
          onReady={startAnimation}
          pendulumParams={{
            initialAngle: 0,
            initialSpeed: 2,
            pendulumType: PendulumType.Random,
          }}
        />
      </div>
    </div>
  );
}
