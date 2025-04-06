
import { LandingFeatures } from "./_components/LandingFeatures";
import LandingHero from "./_components/LandingHero";
import LandingImageStyle from "./_components/LandingImageStyle";

export default function Home() {
  return <div  className="bg-[#000015]" >
  <div className="container max-w-7xl mx-auto px-8">

  <LandingHero/>
  <LandingFeatures/>
  <LandingImageStyle/>

  </div>

  </div>;
}


