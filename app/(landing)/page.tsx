import LandingFeatures from "./_components/LandingFeatures";
import LandingHero from "./_components/LandingHero";
import LandingImageStyle from "./_components/LandingImageStyle";

export default function Home() {
  return (
    <div className="">
      <LandingHero />
      <LandingFeatures />
      <LandingImageStyle />
    </div>
  );
}
