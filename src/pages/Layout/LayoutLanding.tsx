import React from "react";
import Header from "./Header";

const LayoutLanding = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-bg min-h-screen flex flex-col">
      <div className="py-2.5 w-full font-bigShoulderDisplay text-headlineSm uppercase bg-gray text-center text-white">
        be THE one of the fırst creators on thunder -{" "}
        <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:border-b after:border after:w-full">
          APPLY NOW
        </span>
      </div>
      <Header />
      <div className="pt-16">{children}</div>
    </main>
  );
};

export default LayoutLanding;
