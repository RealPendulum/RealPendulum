import "@/app/globals.css";
import NavigationBar from "@/app/navigation";
import { PendulumContainer, PendulumType } from "@/app/pendulum";
import Urls from "@/app/urls";
import { useCallback, useRef, useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto">
        <NavigationBar currentSiteUrl={Urls.homeURL} />
        <div className="flex justify-center">
          <ThreePendulums />
        </div>
      </div>
    </div>
  );
}

function ThreePendulums() {
  const [start, setStart] = useState(false);
  const readyCount = useRef(0);

  const startAnimation = useCallback(() => {
    readyCount.current += 1;
    if (readyCount.current == 2) {
      setStart(true);
    }
  }, []);

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
          color="orange"
          onReady={startAnimation}
          pendulumParams={{
            initialAngle: 0.3,
            initialSpeed: 1.8,
            pendulumType: PendulumType.Random,
          }}
        />
      </div>
    </div>
  );
}
