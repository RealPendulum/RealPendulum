import { FormControlLabel, Slider, Switch } from "@mui/material";
import "@/app/globals.css";
import { PendulumContainer, PendulumType } from "@/app/pendulum";
import { useState } from "react";

import NavigationBar from "@/app/navigation";
import Urls from "@/app/urls";

export default function Examples() {
  return (
    <>
      <NavigationBar currentSiteUrl={Urls.examplesURL} />
      <Playground />
    </>
  );
}

function Playground() {
  const [initialAngle, setInitialAngle] = useState(0.1);
  const [initialVelocity, setInitialVelocity] = useState(0);
  const [pendulumType, setPendulumType] = useState(PendulumType.ODE);
  const [length, setLength] = useState(1);
  const [acceleration, setAcceleration] = useState(9.81);

  const EPS = 0.05;

  return (
    <div className="flex flex-row justify-center mb-16 mt-5">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="w-80 h-80" />
          <div className="w-80 h-80" />
        </div>
        <div className="flex flex-row">
          <div className="w-80 h-80" />
          <div className="h-80 w-80">
            <PendulumContainer
              color="lightgreen"
              pendulumParams={{
                initialAngle: initialAngle,
                initialSpeed: initialVelocity,
                pendulumType: pendulumType,
                length: length,
                acceleration: acceleration,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-evenly w-96 bg-white p-8 rounded-3xl bg-opacity-30 m-5">
        <LabeledSlider
          label="Initial angle"
          defaultValue={initialAngle}
          min={-Math.PI + EPS}
          max={Math.PI - EPS}
          step={0.01}
          marks={[{ value: 0, label: "0" }]}
          valueLabelDisplay="on"
          valueLabelFormat={(value) =>
            `${(value / Math.PI).toFixed(2)}π / ${(
              (value / Math.PI) *
              180
            ).toFixed(2)}°`
          }
          onChangeCommitted={(_event, value) =>
            setInitialAngle(value as number)
          }
        />
        <LabeledSlider
          label="Initial velocity"
          defaultValue={initialVelocity}
          min={-10}
          max={10}
          step={0.01}
          valueLabelDisplay="on"
          marks={[{ value: 0, label: "0" }]}
          valueLabelFormat={(value) => `${value.toFixed(2)}m/s`}
          onChangeCommitted={(_event, value) =>
            setInitialVelocity(value as number)
          }
        />
        <div className="flex flex-row justify-between items-center">
          Approximation
          <Switch
            defaultChecked={true}
            onChange={(_event, value) =>
              setPendulumType(
                value ? PendulumType.ODE : PendulumType.Approximation
              )
            }
          />
          ODE
        </div>

        <LabeledSlider
          label="Length"
          defaultValue={length}
          min={0.01}
          max={2}
          step={0.01}
          marks={[
            {
              value: 1,
              label: "1m",
            },
          ]}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => `${value.toFixed(2)}m`}
          onChangeCommitted={(_event, value) => setLength(value as number)}
        />
        <LabeledSlider
          label="Acceleration"
          defaultValue={acceleration}
          min={-1}
          max={25}
          step={0.01}
          marks={[
            {
              label: "Earth",
              value: 9.81,
            },
            {
              label: "Mars",
              value: 3.7,
            },
            {
              label: "Jupiter",
              value: 24.7,
            },
          ]}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => `${value.toFixed(2)}m/s²`}
          onChangeCommitted={(_event, value) =>
            setAcceleration(value as number)
          }
        />
      </div>
    </div>
  );
}

interface LabeledSliderProps {
  label: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number | null;
  marks?: Array<{ value: number; label: string }>;
  valueLabelDisplay: "on" | "auto" | "off";
  valueLabelFormat: (value: number) => string;
  onChangeCommitted: (event: object, value: number | number[]) => void;
}

function LabeledSlider({
  label,
  defaultValue,
  min,
  max,
  step,
  marks,
  valueLabelFormat,
  onChangeCommitted,
}: LabeledSliderProps) {
  return (
    <div className="flex flex-col text-black text-center">
      <div className="mb-8">{label}</div>
      <Slider
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        marks={marks}
        valueLabelDisplay="on"
        valueLabelFormat={valueLabelFormat}
        onChangeCommitted={onChangeCommitted}
      />
    </div>
  );
}
