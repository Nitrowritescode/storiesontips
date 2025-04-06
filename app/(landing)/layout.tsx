import React from "react";
import LandingHeader from "./_components/LandingHeader";
import LandingFooter from "./_components/LandingFooter";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />

      <main>{children}</main>

      <LandingFooter />
    </>
  );
}

export default layout;
