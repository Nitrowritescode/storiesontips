import React from "react";
import Header  from "../_components/Header";
import Footer from "../_components/Footer";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#000015]">
      <Header />
      <main className="container mx-auto px-4 pt-24">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
