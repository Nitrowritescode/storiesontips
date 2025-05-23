import React from "react";
import LandingFooter from "../(landing)/_components/LandingFooter";
import LandingHeader from "../(landing)/_components/LandingHeader";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#000015]">
      <LandingHeader />
      <main className="container mx-auto px-4 pt-24">{children}</main>
      <LandingFooter />
    </div>
  );
}

export default MainLayout;
