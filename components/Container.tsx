import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto lg:max-w-5xl sm:px-6 sm:py-5 flex">{children}</div>
  );
};

export default Container;
