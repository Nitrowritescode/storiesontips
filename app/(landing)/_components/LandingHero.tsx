import { FlipWords } from "./FlipWords";

export default function LandingHero() {
  const words = ["interesting", "fun", "educational", "inspiring"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-6xl mx-auto p-12 rounded-xl font-normal text-white dark:text-neutral-400 bg-darkestneonblue/80">
        Make
        <FlipWords words={words} /> <br />
        stories with <span className="text-neonblue font-bold">StoriesOnTips</span>
      </div>
    </div>
  );
}
