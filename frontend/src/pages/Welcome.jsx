import React from "react";
import Spline from "@splinetool/react-spline";
import "../style/Welcome.css";

function Welcome() {
  return (
    <div className="splineScroll">
      <Spline scene="https://prod.spline.design/4hsyLHT8b-clMfGd/scene.splinecode" />
    </div>
  );
}

export default Welcome;
