import "@/app/globals.css";
import NavigationBar from "@/app/navigation";
import { TwoPendulums } from "@/app/pendulum";
import Urls from "@/urls";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto">
        <NavigationBar currentSiteUrl={Urls.homeURL} />
        <div className="flex justify-center">
          <TwoPendulums />
        </div>
      </div>
    </div>
  );
}
