import Urls from "./urls";
import { Button } from "@mui/material";
import "@/app/globals.css";

export default function NavigationBar({
  currentSiteUrl,
}: {
  currentSiteUrl: string;
}) {
  return (
    <nav className="flex flex-row justify-center items-center bg-white p-3">
      <div
        className="font-mono text-5xl m-5 text-amber-700"
        style={{ textShadow: "0 2px 3px #000" }}
      >
        RealPendulum
      </div>
      {[
        ["Home", Urls.homeURL],
        ["Game", Urls.gameURL],
        ["Playground", Urls.examplesURL],
        ["Contact", Urls.contactURL],
      ].map(([title, url]) => (
        <Button
          href={url}
          key={title}
          disabled={currentSiteUrl === url}
          className={`m-3 flex h-24 w-24 items-center justify-center rounded-full ${
            currentSiteUrl === url
              ? "bg-green-600 hover:bg-green-800"
              : "bg-blue-600 hover:bg-blue-800"
          } transition duration-200 hover:scale-125 text-white font-sans font-normal text-base`}
          sx={{
            textTransform: "none",
          }}
          style={{ color: "white" }}
        >
          {title}
        </Button>
      ))}
    </nav>
  );
}
