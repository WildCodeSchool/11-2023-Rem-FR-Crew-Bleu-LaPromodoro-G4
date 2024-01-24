import React from "react";
import Spline from "@splinetool/react-spline";
import "../style/Welcome.css";

function Welcome() {
  return (
    <div className="splineScroll">
      <Spline scene="https://prod.spline.design/LwV4wR9w7zjtOyQp/scene.splinecode" />
    </div>
  );
}

export default Welcome;
