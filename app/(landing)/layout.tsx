import React from "react";
import LandingHeader from "./_components/LandingHeader";
import LandingFooter from "./_components/LandingFooter";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <LandingHeader />
      </header>
      <main>{children}</main>
      <footer>
        <LandingFooter />
      </footer>
    </>
  );
}

export default layout;
