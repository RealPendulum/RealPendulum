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
        <Site
          currentSite={currentSite}
          setCurrentSite={setCurrentSite}
          level=""
        />
      </div>
    </>
  );
}

const GameSites: React.FC<DifficultyProps>[] = [Difficulty, Easy, Medium, Hard];

function Difficulty({ currentSite, setCurrentSite, level }: DifficultyProps) {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-1 grow-1 px-[10vw] py-[12vh]">
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
        <div className="flex-1 grow-1 px-[10vw] py-[12vh] text-black">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
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
  });
}

function Hard({ setCurrentSite }: { setCurrentSite: (site: number) => void }) {
  return TwoPendulums({
    currentSite: 3,
    setCurrentSite: setCurrentSite,
    level: "hard",
  });
}

export function TwoPendulums({
  currentSite,
  setCurrentSite,
  level,
}: DifficultyProps) {
  const [start, setStart] = useState(false);
  const readyCount = useRef(0);
  const leftId = useRef("");
  const rightId = useRef("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [stats, setStats] = useState(0);
  const [displayStats, setDisplayStats] = useState(false);
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
    axios.get(`http://localhost:5068/${level}`).then((response) => {
      setData(response.data);
    });
  }, [playCount]);
  return (
    <div className="grid grid-cols-3 gap-4 py-[6vh] w-[60vw]">
      <div className="col-start-1 col-span-2">
        <div className="flex justify-center">
          <div className="flex flex-row justify-between w-40 mb-6">
            <div className="h-80">
              <MyPendulumContainer
                start={start}
                color="lightgreen"
                onReady={registerLeft}
                argData={data === null ? null : data.solution1}
              />
            </div>
            <div className="h-80">
              <MyPendulumContainer
                start={start}
                color="aquamarine"
                onReady={registerRight}
                argData={data === null ? null : data.solution2}
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
              sendAnswer(leftId.current, setIsAnswerCorrect);
              setHasAnswered(true);
              getStats(level, setStats);
              setDisplayStats(true);
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
              sendAnswer(rightId.current, setIsAnswerCorrect);
              setHasAnswered(true);
              getStats(level, setStats);
              setDisplayStats(true);
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
            displayStats ? "visible" : "invisible"
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
              setStats(0);
              setDisplayStats(false);
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

function sendAnswer(id: string, callback: (isAnswerCorrect: boolean) => void) {
  const queryParam = `id=${id}&answer=ode`;
  console.log(id);
  axios
    .get(`http://localhost:5068/result?${queryParam}`)
    .then((response) => {
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
}

interface TwoSolutions {
  solution1: Data;
  solution2: Data;
}
