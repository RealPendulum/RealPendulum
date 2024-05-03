import NavigationBar from "@/app/navigation";
import Urls from "@/app/urls";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar currentSiteUrl={Urls.contactURL} />
      <div>Contact</div>
    </div>
  );
}
