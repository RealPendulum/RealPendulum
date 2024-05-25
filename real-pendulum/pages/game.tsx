import Urls from "@/app/urls";
import NavigationBar from "@/app/navigation";
import { useRef, useState } from "react";
import { PendulumContainer, PendulumType } from "@/app/pendulum";
import "@/app/globals.css";

export default function Game() {
  return (
    <>
      <NavigationBar currentSiteUrl={Urls.gameURL} />
      <div className="flex justify-center pt-5">
        <ThreePendulums />
      </div>
    </>
  );
}

export function ThreePendulums() {
  const [start, setStart] = useState(false);
  const readyCount = useRef(0);

  const startAnimation = () => {
    readyCount.current += 1;
    if (readyCount.current == 3) {
      setStart(true);
    }
  };

  return (
    <div className="w-80 h-80">
      <div className="absolute left-1/2">
        <PendulumContainer
          start={start}
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
          start={start}
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
          start={start}
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
