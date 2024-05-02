import { useState, type ReactNode } from "react";
import { Button } from "@mui/material";
import { PendulumType, PendulumContainer } from "@/app/pendulum";
import "@/app/globals.css";
import Link from "next/link";
import NavigationBar from "@/app/navigation";
import Urls from "@/urls";

export default function Info() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { Slide } = Slides[currentSlide];
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto center">
        <NavigationBar currentSiteUrl={Urls.infoURL} />
        <div className="flex flex-col h-[70vh] justify-between p-5 overflow-auto bg-gray-200">
          <Slide />
        </div>
        <div className="container fixed bottom-0 h-[30vh] z-10 bg-gray-100">
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
  );
}

const Slides: Slide[] = [
  { Slide: Slide0, nextText: "Yes" },
  { Slide: Slide1 },
  { Slide: Slide2 },
  { Slide: Slide3 },
  { Slide: Slide4 },
  { Slide: Slide5 },
  { Slide: Slide6 },
  { Slide: Slide7 },
  { Slide: Slide8 },
  { Slide: Slide9 },
  { Slide: Slide10 },
  { Slide: Slide11 },
  { Slide: Slide12 },
  { Slide: Slide13 },
  { Slide: Slide14 },
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
              onClick={() => setCurrentSlide(index)}
            >
              🟡
            </Button>
          ) : (
            <Button
              key={index}
              color="primary"
              onClick={() => setCurrentSlide(index)}
            >
              ⚪
            </Button>
          )
        )}
      </div>
      <Link
        href={"/"}
        className="m-3 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-800 transition duration-200 hover:scale-125"
      >
        {"Go back"}
      </Link>
    </div>
  );
}

function NavigationArrows({ currentSlide, setCurrentSlide }: NavigationProps) {
  const prevText = "⬅";
  const nextText = Slides[currentSlide].nextText ?? "➡";
  return (
    <div className="text-center">
      {currentSlide >= 1 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCurrentSlide(currentSlide - 1)}
        >
          {prevText}
        </Button>
      )}
      {currentSlide < Slides.length - 1 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCurrentSlide(currentSlide + 1)}
        >
          {nextText}
        </Button>
      )}
    </div>
  );
}

function Slide0() {
  const texts = ["Hi there!", "Let's talk pendulums.", "Are you ready?"];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
    </SlideTemplate>
  );
}

function Slide1() {
  const texts = [
    "Sorry for not giving you a choice there.",
    "But it wouldn't make a lot of sense if you weren't ready.",
    "Lately to my mind came the fact, that we rarely see pendulums in our lives.",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: SMALL PENDULUM CLOCK HERE">
        <PendulumContainer
          isWaitingToStart={false}
          color="lightgreen"
          pendulumParams={{
            initialAngle: 0.5,
            initialSpeed: 0,
            timeStep: 4,
            pendulumType: PendulumType.ODE,
          }}
        />
      </Figure>
    </SlideTemplate>
  );
}

function Slide2() {
  const texts = [
    "And I don't mean that will all the high-tech there's little need for mechanical contraptions - I think it's actually the opposite, we see many pendulums in the digital world. ",
    "The issue is, we don't see them in the real world, the physical pendulums.",
    "The only thing that comes to my mind as a real world example would be the swing currently.",
    'But who looks at the swing with a thought of its\' "pendulumness"?',
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: SWING WITH A CHILD AS A PENDULUM">
        <PendulumContainer
          isWaitingToStart={false}
          color="orange"
          pendulumParams={{
            initialAngle: 0.5 * Math.PI,
            initialSpeed: 0,
            timeStep: 4,
            pendulumType: PendulumType.ODE,
          }}
        />
      </Figure>
    </SlideTemplate>
  );
}

function Slide3() {
  const texts = [
    "In the digital world there are plenty of pendulums, but most of them come with a fatal flaw. They are approximations.",
    "They cut corners, so it's easy to compute them.",
    "At one point they go too far. They forget the limits of those approximations and weave the fake reality.",
    "They make you think that it's how the real world looks.",
    "Or so I would like to verify with this webpage.",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: APPROXIMATION WITHIN ITS LIMITS">
        <PendulumContainer
          isWaitingToStart={false}
          color="aquamarine"
          pendulumParams={{
            initialAngle: 0.2,
            initialSpeed: 0,
            timeStep: 4,
            pendulumType: PendulumType.Approximation,
          }}
        />
      </Figure>
    </SlideTemplate>
  );
}

function Slide4() {
  const texts = [
    "Let's look back at the real pendulum. Let's even go further and compare it with an approximation. Do you see the difference?",
    "Which one is real?",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: TWO PENDULUMS, ONE REAL, ONE APPROXIMATED">
        <div className="flex flex-row justify-between w-16">
          <div>
            <PendulumContainer
              isWaitingToStart={false}
              color="pink"
              pendulumParams={{
                initialAngle: 0.2,
                initialSpeed: 0,
                timeStep: 4,
                pendulumType: PendulumType.ODE,
              }}
            />
          </div>
          <div>
            <PendulumContainer
              isWaitingToStart={false}
              color="yellow"
              pendulumParams={{
                initialAngle: 0.2,
                initialSpeed: 0,
                timeStep: 4,
                pendulumType: PendulumType.Approximation,
              }}
            />
          </div>
        </div>
      </Figure>
    </SlideTemplate>
  );
}

function Slide5() {
  const texts = [
    "You are correct - seems like luck is on your side.",
    "You were wrong - but don't worry, it's just bad luck.",
    "I should explain first what do I mean by the real pendulums and the approximated ones.",
    "Aren't both approximated, since they are digital.",
    "Well - yes, but that's a completely other topic.",
    "I hope you had some physics courses throughout your education, because I'm not going to explain all {mechanika klasyczna/kinematyka} here.",
    "Let's look at this pretty figure of a pendulum.",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: FIGURE OF A PENDULUM" />
    </SlideTemplate>
  );
}

function Slide6() {
  const texts = [
    "We obviously assume, that the string/rod/bar/whatever is there that connects the weight to the anchor of a pendulum is weightless and completely stiff.",
    "What do we mean by completely stiff? Well, basically, that we can totally forget about it.",
    "Therefore we get a simple equation for the outcome force that is applied to the weight.",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: AN EQUATION FOR FORCE" />
    </SlideTemplate>
  );
}

function Slide7() {
  const texts = [
    "What we know from physics, is that force is a derivative of momentum both on mass and speed.",
    "Here we obviously assume, that the mass is constant.",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: AN EQUATION FOR FORCE WITH DERIVATIVES" />
    </SlideTemplate>
  );
}

function Slide8() {
  const texts = [
    "So we have linked the acceleration to the speed. That's not really a discovery.",
    "Then, it won't be any other discovery if we link speed to position.",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: EN EQUATION FOR FORCE WITH SECOND DERIVATIVE TO GET LOCATION" />
    </SlideTemplate>
  );
}

function Slide9() {
  const texts = [
    "And there we go. That's the location. That's the pendulum. This is the finest way to describe it we know of (as long as you don't include more complicated physics here).",
    "We just need to integrate it twice, and we get the function for location.",
    "There's one problem with that though. This equation is hard. Very hard.",
    "I must admit here, I forgot a bit of my physics course and I don't remember if it's impossible to find a nice little function that is the solution here, of if we haven't found it yet.",
    "But regardless, let's just assume it's not possible.",
    "What can we do about it?",
    "There are two ways.",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: CROSSROADS" />
    </SlideTemplate>
  );
}

function Slide10() {
  const texts = [
    "Let's look at the equation back again. We have a sin function there.",
    "This is the real pain here. I wonder how to make it simpler.",
    "Let's do a wild guess - let's replace the sin function with just its argument, why not.",
    "We can check, that for the small values, it's really close.",
    "(Those who know a bit of maths know that it's simple Taylor's expansion).",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: TABLE COMPARING SINX AND X" />
    </SlideTemplate>
  );
}

function Slide11() {
  const texts = [
    "So, if we agree that a small error here would be, say, 5%, we see that this approximation would be good to up to {number} degrees.",
    "And as it turns out now, this is really easy to solve now, provided one has some knowledge of differential equation.",
    "Solution is as goes:",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: SOLUTION" />
    </SlideTemplate>
  );
}

function Slide12() {
  const texts = [
    "And that's it! Now we have a pretty little function from which we can get every value we want, without any guessing, with just a simple calculation.",
    "To be honest, I don't know how to compute the exponent, but my calculator is pretty good at it!",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: CALCULATOR" />
    </SlideTemplate>
  );
}

function Slide13() {
  const texts = [
    "Remember when I said about forgetting the limits of the approximation? This is because, in the digital world, people often misuse the pendulums made with the approximate equation, using the angles far beyond what is reasonable.",
    "Could you guess which pendulum is true now?",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
      <Figure text="PLACEHOLDER: TWO PENDULUMS, ONE REAL, ONE APPROXIMATED">
        <PendulumContainer
          isWaitingToStart={false}
          color="lightgreen"
          pendulumParams={{
            initialAngle: 0.45 * Math.PI,
            initialSpeed: 0,
            timeStep: 4,
            pendulumType: PendulumType.ODE,
          }}
        />
        <PendulumContainer
          isWaitingToStart={false}
          color="aquamarine"
          pendulumParams={{
            initialAngle: 0.45 * Math.PI,
            initialSpeed: 0,
            timeStep: 4,
            pendulumType: PendulumType.Approximation,
          }}
        />
      </Figure>
    </SlideTemplate>
  );
}

function Slide14() {
  const texts = [
    "That was much easier was it?",
    "Well, you're wrong, but I'll just assume you didn't pay close attention.",
    "What is interesting to me is: do people mistake approximations, especially outside their boundaries, for the real behavior of a real pendulum?",
    "Please let me confirm that, playing <the game>.",
  ];
  return (
    <SlideTemplate>
      <TextFromArray texts={texts} />
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

function TextFromArray({ texts }: { texts: string[] }) {
  return (
    <div className="text-center text-black">
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
    </div>
  );
}

interface NavigationProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

interface Slide {
  Slide: React.FC;
  nextText?: string;
}
