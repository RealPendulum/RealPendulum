import NavigationBar from "@/app/navigation";
import Urls from "@/app/urls";
import { GitHub, Mail, Twitter, X } from "@mui/icons-material";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <NavigationBar currentSiteUrl={Urls.contactURL} />
      <div className="flex min-h-screen justify-center items-start pt-8">
        <Person
          name="Agnieszka Trojanowska"
          github="Agnieszka0544"
          mail="agnieszka.t0544@gmail.com"
        />
        <Person
          name="Tomasz Żelawski"
          github="tjzel"
          mail="tzelawski@gmail.com"
          twitter="_tjzel"
        />
      </div>
    </>
  );
}

function Person({ name, github, mail, twitter }: PersonProps) {
  return (
    <div className="flex flex-col justify-center m-5 p-5 pl-10 bg-gradient-to-br from-indigo-100 to-orange-200 rounded-xl transform w-[40vw] max-w-[300px]">
      <div className="text-lg font-bold drop-shadow-md">{name}</div>
      <div className="flex flex-row self-start">
        <Link
          href={"https://github.com/" + github}
          className="mt-2 mb-2 mr-2 transition duration-200 hover:scale-150"
        >
          <GitHub fontSize="large" />
        </Link>
        <Link
          href={"mailto:" + mail}
          className="m-2 transition duration-200 hover:scale-150"
        >
          <Mail fontSize="large" />
        </Link>
        {twitter && (
          <Link
            href={"https://twitter.com/" + twitter}
            className="m-2 transition duration-200 hover:scale-150"
          >
            <X fontSize="large" />
          </Link>
        )}
      </div>
    </div>
  );
}

interface PersonProps {
  name: string;
  github: string;
  mail: string;
  twitter?: string;
}
