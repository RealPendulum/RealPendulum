import Urls from "@/urls";
import NavigationBar from "@/app/navigation";

export default function Game() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar currentSiteUrl={Urls.gameURL} />
      <div>Game</div>
    </div>
  );
}
