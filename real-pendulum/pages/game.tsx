import Urls from "@/app/urls";
import NavigationBar from "@/app/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { Data, MyPendulumContainer, PendulumType } from "@/app/pendulum";
import "@/app/globals.css";
import { Button } from "@mui/material";
import axios from "axios";

export default function Game() {
  const [currentSite, setCurrentSite] = useState(0);
  const Site = GameSites[currentSite];
  return (
    <>
      <NavigationBar currentSiteUrl={Urls.gameURL} />
      <div className="flex justify-center">
        <Site currentSite={currentSite} setCurrentSite={setCurrentSite} />
      </div>
    </>
  );
}

const GameSites: React.FC<LevelProps>[] = [Difficulty, Easy, Medium, Hard];

function Difficulty({ currentSite, setCurrentSite }: LevelProps) {
  return (
    <>
      <div className="flex flex-row px-[10vw] py-[12vh]">
        <div className="flex-1 grow-1 bg-orange-300 bg-opacity-5 p-5 border-4 ">
          <div className="flex justify-center text-black text-2xl">
            Difficulty
          </div>
          <div className="flex justify-center my-10">
            <Button
              sx={{ mx: 3 }}
              variant="outlined"
              color="primary"
              onClick={() => setCurrentSite(1)}
            >
              {"easy"}
            </Button>
            <Button
              sx={{ mx: 3 }}
              variant="outlined"
              color="primary"
              onClick={() => setCurrentSite(2)}
            >
              {"medium"}
            </Button>
            <Button
              sx={{ mx: 3 }}
              variant="outlined"
              color="primary"
              onClick={() => setCurrentSite(3)}
            >
              {"hard"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col ml-10 bg-lime-300 bg-opacity-5 p-5 border-4">
          <div className="text-xl text-center font-bold text-black">
            How to play
          </div>
          <div className=" text-black">
            You will be presented with two pendulums. One of them will have its
            movement calculated by an exact, numerical solution. The other will
            be approximated. Your task is to select the one that is using the
            exact solution.
          </div>
        </div>
      </div>
    </>
  );
}

function Easy({ setCurrentSite }: { setCurrentSite: (site: number) => void }) {
  return TwoPendulums({
    currentSite: 1,
    setCurrentSite: setCurrentSite,
    level: "easy",
    initialAngle: 1.5,
  });
}

function Medium({
  setCurrentSite,
}: {
  setCurrentSite: (site: number) => void;
}) {
  return TwoPendulums({
    currentSite: 2,
    setCurrentSite: setCurrentSite,
    level: "medium",
    initialAngle: 1,
  });
}

function Hard({ setCurrentSite }: { setCurrentSite: (site: number) => void }) {
  return TwoPendulums({
    currentSite: 3,
    setCurrentSite: setCurrentSite,
    level: "hard",
    initialAngle: 0.5,
  });
}

export function TwoPendulums({
  currentSite,
  setCurrentSite,
  level,
  initialAngle,
}: DifficultyProps) {
  const [start, setStart] = useState(false);
  const readyCount = useRef(0);
  const leftId = useRef("");
  const rightId = useRef("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [stats, setStats] = useState(-1);
  const [playCount, setPlayCount] = useState(0);

  const registerLeft = useCallback((id: string) => {
    leftId.current = id;
    startAnimation();
  }, []);

  const registerRight = useCallback((id: string) => {
    rightId.current = id;
    startAnimation();
  }, []);

  const startAnimation = () => {
    readyCount.current += 1;
    if (readyCount.current == 2) {
      setStart(true);
    }
  };

  const [data, setData] = useState<TwoSolutions | null>(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5068/${level}`)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {});
  }, [playCount]);
  return (
    <div className="grid grid-cols-3 gap-4 py-[6vh] w-[60vw]">
      <div className="col-start-1 col-span-2">
        <div className="flex justify-center">
          <div className="flex flex-row justify-between w-40 mb-6 z-20">
            <div className="h-80">
              <MyPendulumContainer
                start={start}
                color="lightgreen"
                onReady={registerLeft}
                argData={data === null ? null : data.solution1}
                initialAngle={initialAngle}
              />
            </div>
            <div className="h-80">
              <MyPendulumContainer
                start={start}
                color="aquamarine"
                onReady={registerRight}
                argData={data === null ? null : data.solution2}
                initialAngle={initialAngle}
              />
            </div>
          </div>
        </div>
        <div className="flex text-black justify-center text-xl">
          Which pendulum is real?
        </div>
        <div className="flex justify-center my-3">
          <Button
            sx={{ mx: 3 }}
            variant="outlined"
            color="primary"
            disabled={!start || hasAnswered}
            onClick={() => {
              sendAnswer(leftId.current, level, setStats, setIsAnswerCorrect);
              setHasAnswered(true);
            }}
          >
            {"left"}
          </Button>
          <Button
            sx={{ mx: 3 }}
            variant="outlined"
            color="primary"
            disabled={!start || hasAnswered}
            onClick={() => {
              sendAnswer(rightId.current, level, setStats, setIsAnswerCorrect);
              setHasAnswered(true);
            }}
          >
            {"right"}
          </Button>
        </div>
        {isAnswerCorrect === null ? null : isAnswerCorrect ? (
          <div className="flex text-black justify-center">You were right!</div>
        ) : (
          <div className="flex text-black justify-center">You were wrong!</div>
        )}
        <div
          className={`flex text-black justify-center mb-6 text-wrap ${
            stats >= 0 ? "visible" : "invisible"
          }`}
        >
          {stats}% of the answers given by the players were correct.
        </div>
      </div>
      <div className="col-start-3 flex justify-start items-start">
        <div className="flex flex-col justify-center">
          <Button
            className={`m-3 flex h-24 w-24 items-center justify-center rounded-full 
            bg-teal-500 hover:bg-teal-800 transition duration-200 hover:scale-125 text-white font-sans font-normal text-base`}
            sx={{
              textTransform: "none",
            }}
            style={{ color: "white" }}
            onClick={() => setCurrentSite(0)}
          >
            Go back
          </Button>
          <Button
            className={`m-3 flex h-24 w-24 items-center justify-center rounded-full ${
              hasAnswered
                ? "bg-teal-500 hover:bg-teal-800"
                : "bg-slate-500 hover:bg-slate-800"
            }
             transition duration-200 hover:scale-125 text-white font-sans font-normal text-base`}
            sx={{
              textTransform: "none",
            }}
            style={{ color: "white" }}
            disabled={!hasAnswered}
            onClick={() => {
              setCurrentSite(currentSite);
              setStart(false);
              readyCount.current = 0;
              leftId.current = "";
              rightId.current = "";
              setIsAnswerCorrect(null);
              setHasAnswered(false);
              setStats(-1);
              setPlayCount(playCount + 1);
            }}
          >
            Play again
          </Button>
        </div>
      </div>
    </div>
  );
}

function sendAnswer(
  id: string,
  level: string,
  setter: (stats: number) => void,
  callback: (isAnswerCorrect: boolean) => void
) {
  const queryParam = `id=${id}&answer=ode`;
  axios
    .get(`http://localhost:5068/result?${queryParam}`)
    .then((response) => {
      const isAnswerCorrect = isCorrectAnswer(response.data);
      callback(isAnswerCorrect);
      getStats(level, setter);
    })
    .catch((error) => {
      console.log(error);
    });
}

function isCorrectAnswer(data: string | { message: string }) {
  return typeof data === "string";
}

function getStats(level: string, callback: (stats: number) => void) {
  axios
    .get(`http://localhost:5068/stats?difficulty=${capitalize(level)}`)
    .then((response) => {
      const stats = response.data;
      callback(Number(Number(stats * 100).toFixed(2)));
    })
    .catch((error) => {
      console.log(error);
    });
}

function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

interface DifficultyProps {
  currentSite: number;
  setCurrentSite: (site: number) => void;
  level: string;
  initialAngle: number;
}

interface LevelProps {
  currentSite: number;
  setCurrentSite: (site: number) => void;
}

interface TwoSolutions {
  solution1: Data;
  solution2: Data;
}
