import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex sm:px-6 sm:py-5 lg:max-w-5xl">{children}</div>
  );
};

export default Container;
