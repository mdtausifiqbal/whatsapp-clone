import { useState, useEffect } from "react";
import "./NetDetector.css";

export default function NetDetector({ children }) {
  const [isOnline, setOnline] = useState(true);
  useEffect(() => {
    window.addEventListener("online", (event) => {
      setOnline(true);
    });
    window.addEventListener("offline", (event) => {
      setOnline(false);
    });
  }, []);
  return (
    <>
      {isOnline ? (
        <>{children}</>
      ) : (
        <div className="netdetector">
          <h1>You are offline !</h1>
          <p>Please connect to internet to use this app</p>
        </div>
      )}
    </>
  );
}
