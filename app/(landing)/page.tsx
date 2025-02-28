
import { LandingFeatures } from "./_components/LandingFeatures";
import LandingHero from "./_components/LandingHero";

export default function Home() {
  return <div className="bg-[url('/landing/background3.webp')] bg-cover bg-center backdrop-blur-3xl" >
  <LandingHero/>
  <LandingFeatures/>

  </div>;
}


