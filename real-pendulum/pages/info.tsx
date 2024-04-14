import { useState } from "react";
import { Button } from "@mui/material";
import { PendulumType, PendulumContainer, TwoPendulums } from "@/app/pendulum";

export default function Info() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { Slide } = Slides[currentSlide];
  return (
    <>
      <Slide />
      <div />
      <NavigationPanel
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </>
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
    <div style={{ textAlign: "center", height: "30vh" }}>
      <NavigationArrows
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
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
  );
}

function NavigationArrows({ currentSlide, setCurrentSlide }: NavigationProps) {
  const prevText = "⬅";
  const nextText = Slides[currentSlide].nextText ?? "➡";
  return (
    <div style={{ textAlign: "center", height: "30vh" }}>
      {currentSlide >= 1 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCurrentSlide(currentSlide - 1)}
        >
          {prevText}
        </Button>
      )}
      {currentSlide <= Slides.length - 1 && (
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
    <div style={{}}>
      <div style={{ textAlign: "center", height: "30vh" }}>
        {texts.map((text, index) => (
          <div key={index}>{text}</div>
        ))}
      </div>
    </div>
  );
}

function Slide1() {
  const texts = [
    "Sorry for not giving you a choice there.",
    "But it wouldn't make a lot of sense if you weren't ready.",
    "Lately to my mind came the fact, that we rarely see pendulums in our lives.",
  ];
  return (
    <>
      <div style={{ textAlign: "center", height: "30vh" }}>
        {texts.map((text, index) => (
          <div key={index}>{text}</div>
        ))}
        <PendulumContainer
          isWaitingToStart={false}
          color="lightgreen"
          pendulumParams={{
            initialAngle: 0,
            initialSpeed: 2,
            timeStep: 4,
            pendulumType: PendulumType.ODE,
          }}
        />
        <div>PLACEHOLDER: SMALL PENDULUM CLOCK HERE</div>
      </div>
    </>
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
    <>
      <div style={{ textAlign: "center", height: "30vh" }}>
        {texts.map((text, index) => (
          <div key={index}>{text}</div>
        ))}
        <PendulumContainer
          isWaitingToStart={false}
          color="aquamarine"
          pendulumParams={{
            initialAngle: 0,
            initialSpeed: 10,
            timeStep: 4,
            pendulumType: PendulumType.ODE,
          }}
        />
        <div>PLACEHOLDER: SWING WITH A CHILD AS A PENDULUM</div>
      </div>
    </>
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
    <>
      <div style={{ textAlign: "center", height: "30vh" }}>
        {texts.map((text, index) => (
          <div key={index}>{text}</div>
        ))}
        <TwoPendulums />
        <div>PLACEHOLDER: TWO PENDULUMS, ONE REAL, ONE APPROXIMATED</div>
      </div>
    </>
  );
}

function Slide4() {
  const texts = [
    "Let's look back at the real pendulum. Let's even go further and compare it with an approximation. Do you see the difference?",
    "Which one is real?",
  ];
  return (
    <>
      <div style={{ textAlign: "center", height: "30vh" }}>
        {texts.map((text, index) => (
          <div key={index}>{text}</div>
        ))}
        <div>PLACEHOLDER: TWO PENDULUMS, ONE REAL, ONE APPROXIMATED</div>
      </div>
    </>
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
    <div style={{ textAlign: "center", height: "30vh" }}>
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
      <div>PLACEHOLDER: FIGURE OF A PENDULUM</div>
    </div>
  );
}

function Slide6() {
  const texts = [
    "We obviously assume, that the string/rod/bar/whatever is there that connects the weight to the anchor of a pendulum is weightless and completely stiff.",
    "What do we mean by completely stiff? Well, basically, that we can totally forget about it.",
    "Therefore we get a simple equation for the outcome force that is applied to the weight.",
  ];
  return (
    <div style={{ textAlign: "center", height: "30vh" }}>
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
      <div>PLACEHOLDER: AN EQUATION FOR FORCE</div>
    </div>
  );
}

function Slide7() {
  const texts = [
    "What we know from physics, is that force is a derivative of momentum both on mass and speed.",
    "Here we obviously assume, that the mass is constant.",
  ];
  return (
    <div style={{ textAlign: "center", height: "30vh" }}>
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
      <div>PLACEHOLDER: AN EQUATION FOR FORCE WITH DERIVATIVES</div>
    </div>
  );
}

function Slide8() {
  const texts = [
    "So we have linked the acceleration to the speed. That's not really a discovery.",
    "Then, it won't be any other discovery if we link speed to position.",
  ];
  return (
    <div style={{ textAlign: "center", height: "30vh" }}>
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
      <div>
        PLACEHOLDER: EN EQUATION FOR FORCE WITH SECOND DERIVATIVE TO GET
        LOCATION
      </div>
    </div>
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
    <div style={{ textAlign: "center", height: "30vh" }}>
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
    </div>
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
    <div style={{ textAlign: "center", height: "30vh" }}>
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
      <div>PLACEHOLDER: TABLE COMPARING SINX AND X</div>
    </div>
  );
}

function Slide11() {
  const texts = [
    "So, if we agree that a small error here would be, say, 5%, we see that this approximation would be good to up to {number} degrees.",
    "And as it turns out now, this is really easy to solve now, provided one has some knowledge of differential equation.",
    "Solution is as goes:",
  ];
  return (
    <div style={{ textAlign: "center", height: "30vh" }}>
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
      <div>PLACEHOLDER: SOLUTION</div>
    </div>
  );
}

function Slide12() {
  const texts = [
    "And that's it! Now we have a pretty little function from which we can get every value we want, without any guessing, with just a simple calculation.",
    "To be honest, I don't know how to compute the exponent, but my calculator is pretty good at it!",
  ];
  return (
    <div style={{ textAlign: "center", height: "30vh" }}>
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
      <div>PLACEHOLDER: CALCULATOR</div>
    </div>
  );
}

function Slide13() {
  const texts = [
    "Remember when I said about forgetting the limits of the approximation? This is because, in the digital world, people often misuse the pendulums made with the approximate equation, using the angles far beyond what is reasonable.",
    "Could you guess which pendulum is true now?",
  ];
  return (
    <div style={{ textAlign: "center", height: "30vh" }}>
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
      <TwoPendulums />
      <div>PLACEHOLDER: TWO PENDULUMS, ONE REAL, ONE APPROXIMATED</div>
    </div>
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
    <div style={{ textAlign: "center", height: "30vh" }}>
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
