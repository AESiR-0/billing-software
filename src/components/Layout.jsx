import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [path, setPath] = useState("");
  useEffect(() => {
    const path = window.location.pathname;
    setPath(path);
  });
  if (path != "/")
    return (
      <div className="flex w-screen">
        <Sidebar />
        {children}
      </div>
    );
  else return <div>{children}</div>;
}
