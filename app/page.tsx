import Features from "./_components/Features";
import {Header} from "./_components/Header";
import {Hero} from "./_components/Hero";

export default function Home() {
  return <div className="bg-fancy">
  <Hero/>
  <Features/>
  </div>;
}
