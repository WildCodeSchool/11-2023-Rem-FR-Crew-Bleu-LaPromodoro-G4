/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { motion } from "framer-motion";
import "../App.css";

function transition({ OgComponent }) {
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);
  return (
    <>
      {OgComponent}
      <motion.div
        className="slide-in1"
        style={{
          backgroundColor: userTheme.backgroundColor,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-in2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out1"
        style={{
          backgroundColor: userTheme.backgroundColor,
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out2"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}

export default transition;
