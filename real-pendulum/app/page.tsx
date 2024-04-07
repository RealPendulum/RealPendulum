"use client";
import {
  useEffect,
  useRef,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";
import axios from "axios";
import { Pendulums } from "./pendulum";

export default function Home() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: "#e5ddf0",
      }}
    >
      <Pendulums />
    </div>
  );
}
