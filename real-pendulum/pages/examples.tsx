import NavigationBar from "@/app/navigation";
import Urls from "@/urls";

export default function Examples() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar currentSiteUrl={Urls.examplesURL} />
      <div>Examples</div>
    </div>
  );
}
