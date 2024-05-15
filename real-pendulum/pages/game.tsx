import Urls from "@/app/urls";
import NavigationBar from "@/app/navigation";
import { useRef, useState } from "react";
import { PendulumContainer, PendulumType } from "@/app/pendulum";
import "@/app/globals.css";
import { Button } from "@mui/material";
import axios from "axios";

export default function Game() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar currentSiteUrl={Urls.gameURL} />
      <div className="flex justify-center">
        <TwoPendulums />
      </div>
    </div>
  );
}

export function TwoPendulums() {
  const [isWaitingToStart, setIsWaitingToStart] = useState(true);
  const readyCount = useRef(0);
  const leftId = useRef("");
  const rightId = useRef("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [stats, setStats] = useState(0);

  const registerLeft = (id: string) => {
    leftId.current = id;
    startAnimation();
  };

  const registerRight = (id: string) => {
    rightId.current = id;
    startAnimation();
  };

  const startAnimation = () => {
    readyCount.current += 1;
    if (readyCount.current == 2) {
      setIsWaitingToStart(false);
    }
  };

  return (
    <div>
      <div className="flex w-120 h-120 bg-red-200">
        <div className="relative h-80 m-20 ">
          <PendulumContainer
            isWaitingToStart={isWaitingToStart}
            color="lightgreen"
            onReady={registerLeft}
            pendulumParams={{
              initialAngle: 0,
              initialSpeed: 2,
              pendulumType: PendulumType.ODE,
            }}
          />
        </div>
        <div className="relative h-80 m-20">
          <PendulumContainer
            isWaitingToStart={isWaitingToStart}
            color="aquamarine"
            onReady={registerRight}
            pendulumParams={{
              initialAngle: 0,
              initialSpeed: 2,
              pendulumType: PendulumType.Approximation,
            }}
          />
        </div>
      </div>
      <div className="flex text-black justify-center bg-green-300">
        Which pendulum is real?
      </div>
      <div className="flex justify-center">
        <Button
          sx={{ mx: 3 }}
          variant="outlined"
          color="primary"
          disabled={isWaitingToStart || hasAnswered}
          onClick={() => {
            sendAnswer(leftId.current, setIsAnswerCorrect);
            setHasAnswered(true);
            getStats(setStats);
          }}
        >
          {"left"}
        </Button>
        <Button
          sx={{ mx: 3 }}
          variant="outlined"
          color="primary"
          disabled={isWaitingToStart || hasAnswered}
          onClick={() => {
            sendAnswer(rightId.current, setIsAnswerCorrect);
            setHasAnswered(true);
            getStats(setStats);
          }}
        >
          {"right"}
        </Button>
      </div>
      {isAnswerCorrect === null ? null : isAnswerCorrect ? (
        <div className="flex text-black justify-center bg-green-300">
          You were right!
        </div>
      ) : (
        <div className="flex text-black justify-center bg-green-300">
          You were wrong!
        </div>
      )}
      <div className="flex text-black justify-center bg-blue-300 mb-16">
        {stats}% of players were right.
      </div>
    </div>
  );
}

function sendAnswer(id: string, callback: (isAnswerCorrect: boolean) => void) {
  const queryParam = `id=${id}&answer=ode`;
  console.log(id);
  axios
    .get(`http://localhost:5068/result?${queryParam}`)
    .then((response) => {
      console.log(response.data);
      const isAnswerCorrect = isCorrectAnswer(response.data);
      callback(isAnswerCorrect);
    })
    .catch((error) => {
      console.log(error);
    });
}

function isCorrectAnswer(data: string | { message: string }) {
  return typeof data === "string";
}

function getStats(callback: (stats: number) => void) {
  axios
    .get(`http://localhost:5068/stats`)
    .then((response) => {
      console.log("stats");
      console.log(response.data);
      const stats = response.data;
      callback(stats);
    })
    .catch((error) => {
      console.log(error);
    });
}

//endpoint stats, zapytanie get bezparametrowe - ilu użytkowników miało rację, przejść po całej mapie
// i sprawdzić ile było poprawnych odpowiedzi

// type Data = {
//   id: string;
//   answer: string;
// };
