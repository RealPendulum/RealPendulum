import React, { useCallback, useRef, useState, type ReactNode } from "react";
import { Button } from "@mui/material";
import { PendulumType, PendulumContainer } from "@/app/pendulum";
import "@/app/globals.css";
import NavigationBar from "@/app/navigation";
import Urls from "@/app/urls";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Circle,
  CircleOutlined,
} from "@mui/icons-material";
import Image from "next/image";

export default function Info() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const Slide = Slides[currentSlide];
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col ">
      <NavigationBar currentSiteUrl={Urls.homeURL} />
      <div className="flex-grow overflow-auto bg-gradient-to-br from-green-100 to-blue-200 transform">
        <div className="container center mx-auto p-5">
          <Slide setCurrentSlide={setCurrentSlide} />
        </div>
      </div>
      <div className="p-5">
        <div className="container mx-auto p-5">
          <div className="flex flex-col gap-4">
            <NavigationArrows
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
            <NavigationPanel
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Slides: Slide[] = [
  Slide0,
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
  Slide10,
  Slide11,
  Slide12,
  Slide13,
  Slide14,
  Slide15,
];

function NavigationPanel({ currentSlide, setCurrentSlide }: NavigationProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center justify-center">
        {Slides.map((_slide, index) =>
          index <= currentSlide ? (
            <Button
              key={index}
              color="primary"
              size="small"
              onClick={() => setCurrentSlide(index)}
            >
              <Circle />
            </Button>
          ) : (
            <Button
              key={index}
              color="primary"
              size="small"
              onClick={() => setCurrentSlide(index)}
            >
              <CircleOutlined />
            </Button>
          )
        )}
      </div>
    </div>
  );
}

function NavigationArrows({ currentSlide, setCurrentSlide }: NavigationProps) {
  return (
    <div className="text-center">
      {currentSlide >= 1 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCurrentSlide(currentSlide - 1)}
        >
          <ArrowBackIos />
        </Button>
      )}
      {currentSlide < Slides.length - 1 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCurrentSlide(currentSlide + 1)}
        >
          <ArrowForwardIos />
        </Button>
      )}
    </div>
  );
}

function Slide0({ setCurrentSlide }: SlideProps) {
  return (
    <SlideTemplate>
      <div className="info-text">{"Hi there!"}</div>
      <div className="info-text">
        {"Let's talk "}
        <span className="font-bold">{"pendulums."}</span>
      </div>
      <div className="info-text">{"Are you ready?"}</div>
      <Button
        className="mt-4 bg-blue-400 mb-8"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setCurrentSlide((value) => value + 1)}
      >
        Yes
      </Button>
      <ThreePendulums />
    </SlideTemplate>
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

function Slide1() {
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "Sorry for not giving you a choice there. But it wouldn't make a lot of sense if you weren't ready. Lately to my mind came the fact, that "
        }
        <span className="font-bold">
          {"we rarely see pendulums in our lives."}
        </span>
      </div>
      <Figure text="PLACEHOLDER: SMALL PENDULUM CLOCK HERE">
        <PendulumContainer
          color="lightgreen"
          pendulumParams={{
            initialAngle: 0.5,
            initialSpeed: 0,
            pendulumType: PendulumType.ODE,
          }}
        />
      </Figure>
    </SlideTemplate>
  );
}

function Slide2() {
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "And I don't mean that will all the high-tech there's little need for mechanical contraptions - I think it's actually the opposite, we see many pendulums in the digital world. The issue is, we don't see them in the real world, "
        }
        <span className="font-bold">{"the physical pendulums."}</span>
        {
          " The only thing that comes to my mind as a real world example would be the swing currently. But who looks at the swing with a thought of its 'pendulumness'?"
        }
      </div>
      <Figure text="PLACEHOLDER: SWING WITH A CHILD AS A PENDULUM">
        <PendulumContainer
          color="orange"
          pendulumParams={{
            initialAngle: 0.5 * Math.PI,
            initialSpeed: 0,
            pendulumType: PendulumType.ODE,
          }}
        />
      </Figure>
    </SlideTemplate>
  );
}

function Slide3() {
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "In the digital world there are plenty of pendulums, but most of them come with a fatal flaw. They are "
        }
        <span className="font-bold">{"approximations."}</span>
        {
          " They cut corners, so it's easy to compute them. At one point they go too far. They "
        }
        <span className="font-bold">
          {"forget the limits of those approximations"}
        </span>
        {
          " and weave the fake reality. They make you think that it's how the real world looks. Or so I would like to verify with this webpage."
        }
      </div>
      <Figure>
        <PendulumContainer
          color="aquamarine"
          pendulumParams={{
            initialAngle: 0.2,
            initialSpeed: 0,
            pendulumType: PendulumType.Approximation,
          }}
        />
      </Figure>
    </SlideTemplate>
  );
}

function Slide4() {
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "Let's look back at the real pendulum. Let's even go further and compare it with an approximation. Do you see the difference?"
        }
        <div className="font-bold">{"Which one is real?"}</div>
      </div>
      <Figure>
        <div className="flex flex-row justify-between w-16">
          <div>
            <PendulumContainer
              color="pink"
              pendulumParams={{
                initialAngle: 0.2,
                initialSpeed: 0,
                pendulumType: PendulumType.ODE,
              }}
            />
          </div>
          <div>
            <PendulumContainer
              color="yellow"
              pendulumParams={{
                initialAngle: 0.2,
                initialSpeed: 0,
                pendulumType: PendulumType.Approximation,
              }}
            />
          </div>
        </div>
      </Figure>
      <AnswerButtons answer={answer} setAnswer={setAnswer} />
      <AnswerTexts
        answer={answer}
        correctText={"You are correct - seems like luck is on your side."}
        wrongText={"You were wrong - but don't worry, it's just bad luck."}
      />
    </SlideTemplate>
  );
}

const BASE_WIDTH = 600;

function Slide5() {
  const ratio = 401 / 623;
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "I should explain first what do I mean by the real pendulums and the approximated ones. You might be wondering - aren't both approximated, since they are digital? Well - yes, but that's a completely other topic and "
        }
        <span className="font-bold">
          {"we are not going to talk about numerical methods here."}
        </span>
        {
          " I hope you had some physics courses throughout your education, because it's time for some kinematics!"
        }
        <div className="font-bold">
          {"Let's look at this pretty figure of a pendulum."}
        </div>
      </div>
      <Image
        src="/assets/figure.png"
        alt="A pretty figure of a pendulum"
        className="m-2"
        width={BASE_WIDTH}
        height={BASE_WIDTH * ratio}
      />
    </SlideTemplate>
  );
}

function Slide6() {
  const ratio = 341 / 732;
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "We obviously assume the string that connects the weight to the anchor of a pendulum is weightless and completely stiff. What do we mean by completely stiff? Well, basically, that we can totally forget about it, alongside with its tension. Therefore we get a simple equation for the "
        }
        <span className="font-bold">{"resultant force"}</span>{" "}
        {"that is applied to the weight."}
      </div>
      <Image
        src="/assets/force-figure.png"
        alt="An equation for pendulum's force"
        className="m-2"
        width={BASE_WIDTH}
        height={BASE_WIDTH * ratio}
      />
    </SlideTemplate>
  );
}

function Slide7() {
  const ratio = 1275 / 1113;
  return (
    <SlideTemplate>
      <div className="info-text">
        {"What we know from physics, is that "}
        <span className="font-bold">
          {"force is a time derivative of momentum."}
        </span>
        {
          " That means, that it's a product of time derivative of mass and time derivative of speed. However, we obviously assume here that "
        }
        <span className="font-bold">{"the mass is constant."}</span>
      </div>
      <Image
        src="/assets/momentum-derivative.png"
        alt="An equation for force with momentum derivative"
        className="m-2"
        width={BASE_WIDTH}
        height={BASE_WIDTH * ratio}
      />
      <div className="info-text">
        {
          "You might have noticed we also assumed that the length is constant. Without all these assumptions the problem would be much more interesting, but simultaneously much more difficult. Important thing here is we successfully "
        }
        <span className="font-bold">{"linked the force to the angle."}</span>
      </div>
    </SlideTemplate>
  );
}

function Slide8() {
  const ratio = 547 / 800;
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "Now all we need is to substitute our force and make the equation a bit prettier."
        }
      </div>
      <Image
        src="/assets/substitute.png"
        alt="An equation for pendulum's location"
        className="m-2"
        width={BASE_WIDTH}
        height={BASE_WIDTH * ratio}
      />
      <div className="info-text">
        {
          "Notice we added a minus there. If you do some maths, you'll see why that's necessary. And there we go. That's it. That's the pendulum. If we solve this equation, we will know everything about it. "
        }
        <span className="font-bold">
          {"This is the finest way to describe it we know of"}
        </span>
        {
          " - as long as you don't include more complicated physics here, like friction, string properties, etc. To solve it, we just need to integrate it twice."
        }
      </div>
    </SlideTemplate>
  );
}

function Slide9() {
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "There are two problems with that though. First - integrals are difficult. Second - this equation is difficult, "
        }
        <span className="font-bold">{"very difficult."}</span>
        {
          " From what I remember, it's impossible to find a nice little function that is the solution here."
        }
      </div>
      <div className="info-text">
        {"What does it mean? Are we doomed? What can we do about it?"}
        <div className="font-bold">{"There are two ways."}</div>
      </div>
      <Figure text="PLACEHOLDER: CROSSROADS" />
    </SlideTemplate>
  );
}

function Slide10() {
  // 615 × 859 pixels
  const ratio = 859 / 615;
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "Let's look at the equation back again. We have a sin function there. This is the real pain here. I wonder how to make it simpler. Let's do a wild guess - "
        }
        <span className="font-bold">
          {"let's replace the sin function with just its argument."}
        </span>
        {
          " We can check, that for the small values, it's really close. Those who know a bit of maths know that "
        }
        <span className="font-bold">{"it's a simple Taylor's expansion."}</span>
      </div>
      <Image
        src="/assets/table.png"
        alt="A table comparing sin(x) and x"
        width={BASE_WIDTH / 1.5}
        height={(BASE_WIDTH * ratio) / 1.5}
      />
    </SlideTemplate>
  );
}

function Slide11() {
  // 885 × 1229 pixels
  const ratio = 1229 / 885;
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "So, if we agree that a small error here would be, say, five percent, we see that this approximation would be good to up to around 0.6 radians, that is 34 degrees. And as it turns out now, "
        }
        <span className="font-bold">{"it's really easy to solve now."}</span>
        {" Let's take a look at the solution."}
      </div>
      <Image
        src="/assets/approx.png"
        alt="Approximation of the solution"
        width={BASE_WIDTH}
        height={BASE_WIDTH * ratio}
      />
      <div className="info-text">
        {"And that's it! We have a "}
        <span className="font-bold">
          {"pretty little function we couldn't get in the previous equation."}
        </span>
      </div>
    </SlideTemplate>
  );
}

function Slide12() {
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "Now all you need to do is to put it into a calculator. Mine is pretty good at it!"
        }
      </div>
      <Figure text="PLACEHOLDER: CALCULATOR" />
    </SlideTemplate>
  );
}

function Slide13() {
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "That was one way. Nice, but you know. Sometimes a bit far from reality. The other way would be to "
        }
        <span className="font-bold">{"solve it numerically."}</span>
        {
          " Basically, you just guess the value for a given point and then check if it's correct. If it's not, you try a different value. And you do that until you get a good enough value. Then you repeat the process for the next point. "
        }
        <span className="font-bold">{"Extremely boring!"}</span>
        {" That's why we use computers for it."}
      </div>
      <Figure text="PLACEHOLDER: AN OLD COMPUTER" />
    </SlideTemplate>
  );
}

function Slide14() {
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "Let's circle back a bit. Remember when I said about forgetting the limits of the approximation? This is because, in the digital world, people often misuse the pendulums made with the approximate equation, putting in angles far beyond what is reasonable. Could you guess "
        }
        <span className="font-bold">{"which pendulum is true now?"}</span>
        {
          " If you look close enough, it shouldn't be too much of a challenge. Try to "
        }
        <span className="font-bold">{"focus on the acceleration."}</span>
      </div>
      <Figure>
        <div className="flex flex-row justify-between w-64">
          <div>
            <PendulumContainer
              color="lightgreen"
              pendulumParams={{
                initialAngle: 0.45 * Math.PI,
                initialSpeed: 0,
                pendulumType: PendulumType.ODE,
              }}
            />
          </div>
          <div>
            <PendulumContainer
              color="aquamarine"
              pendulumParams={{
                initialAngle: 0.45 * Math.PI,
                initialSpeed: 0,
                pendulumType: PendulumType.Approximation,
              }}
            />
          </div>
        </div>
      </Figure>
      <AnswerButtons answer={answer} setAnswer={setAnswer} />
      <AnswerTexts
        answer={answer}
        correctText={"That was much easier, wasn't it?"}
        wrongText={
          "Well, you're wrong, but I'll just assume you didn't pay close attention."
        }
      />
    </SlideTemplate>
  );
}

function Slide15() {
  return (
    <SlideTemplate>
      <div className="info-text">
        {
          "Thank you for your time, venturing on this journey with me. I hope you enjoyed it. If you have some questions or remarks, there should be a contact tab somewhere up here. If you want to experience some more pendulums, you can help me answer the question that had been on my mind:"
        }
      </div>
      <div className="info-text italic">
        {
          "How often do people mistake approximations, especially outside their boundaries, for the real behavior of a real pendulum?"
        }
      </div>
      <div className="info-text">
        {" Please let me find that out by playing "}
        <a
          href="game/"
          className=" font-bold text-blue-600 hover:text-blue-800 underline"
        >
          the game
        </a>
        {"."}
      </div>
      <Figure text="PLACEHOLDER: A CAT TOYING WITH A PENDULUM" />
    </SlideTemplate>
  );
}

function SlideTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center text-black">
      {children}
    </div>
  );
}

function Figure({ children, text }: { children?: ReactNode; text?: string }) {
  return (
    <>
      <div className="relative h-80 m-4">{children}</div>
      <div>{text}</div>
    </>
  );
}

function AnswerButtons({
  answer,
  setAnswer,
}: {
  answer: string | null;
  setAnswer: (answer: string) => void;
}) {
  return (
    <div className="flex flex-row justify-center">
      <Button
        className="m-5 bg-blue-400"
        variant={`${answer === "correct" ? "outlined" : "contained"}`}
        color="primary"
        size="large"
        disabled={answer !== null}
        onClick={() => setAnswer("correct")}
      >
        Left
      </Button>
      <Button
        className="m-5 bg-blue-400"
        variant={`${answer === "wrong" ? "outlined" : "contained"}`}
        color="primary"
        size="large"
        disabled={answer !== null}
        onClick={() => setAnswer("wrong")}
      >
        Right
      </Button>
    </div>
  );
}

function AnswerTexts({ answer, correctText, wrongText }: AnswerTextsProps) {
  return (
    <div>
      {answer === "correct" && (
        <div className="info-text text-green-600">{correctText}</div>
      )}
      {answer === "wrong" && (
        <div className="info-text text-red-600">{wrongText}</div>
      )}
    </div>
  );
}

interface AnswerTextsProps {
  answer: string | null;
  correctText: string;
  wrongText: string;
}

interface NavigationProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

type Slide = React.FC<SlideProps>;

interface SlideProps {
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}
