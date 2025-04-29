import React from "react";
import Header from "./_components/LandingHeader";
import LandingFooter from "./_components/LandingFooter";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <LandingFooter />
    </>
  );
}

export default layout;
