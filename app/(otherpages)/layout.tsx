import React from "react";
import LandingFooter from "../_components/Footer";
import Header from "../(landing)/_components/LandingHeader";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#000015]">
      <Header />
      <main className="container mx-auto px-4 pt-24">{children}</main>
      <LandingFooter />
    </div>
  );
}

export default MainLayout;
