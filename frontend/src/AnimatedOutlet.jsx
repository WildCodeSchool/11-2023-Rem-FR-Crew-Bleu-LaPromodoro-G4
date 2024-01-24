import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet(); // Make sure useOutlet is defined in your code

  return (
    <AnimatePresence mode="wait">
      {element && React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}

export default AnimatedOutlet;
