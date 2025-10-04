// AOSContext.js
import { createContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSContext = createContext();

export const AOSProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
    });
  }, []);

  return <AOSContext.Provider value={{ AOS }}>{children}</AOSContext.Provider>;
};

export default AOSContext;
