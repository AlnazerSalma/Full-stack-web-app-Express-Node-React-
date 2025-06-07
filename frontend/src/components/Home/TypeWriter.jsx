import React from "react";
import Typewriter from "typewriter-effect";
import'../../style/Home.css';
function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Momentify",
          "Norby",
          "Spark",
          "Google",
          "Harvard",
          "Neon Horizons",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
