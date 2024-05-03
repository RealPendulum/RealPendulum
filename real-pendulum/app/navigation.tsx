import Link from "next/link";
import Urls from "@/urls";
import { Button } from "@mui/material";
import "@/app/globals.css";

export default function NavigationBar({
  currentSiteUrl,
}: {
  currentSiteUrl: string;
}) {
  return (
    <nav>
      <div className="flex flex-row justify-center p-3">
        {[
          ["Home", Urls.homeURL],
          ["Info", Urls.infoURL],
          ["Game", Urls.gameURL],
          ["Examples", Urls.examplesURL],
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
            sx={{ textTransform: "none" }}
          >
            {title}
          </Button>
        ))}
      </div>
    </nav>
  );
}
