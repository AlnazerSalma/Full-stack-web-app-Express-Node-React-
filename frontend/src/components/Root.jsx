import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import StarterPage from "../src/components/StarterPage/LandingPage";
import reportWebVitals from "./reportWebVitals";

const Root = () => {
  const [started, setStarted] = useState(false);

  return (
    <React.StrictMode>
      {started ? (
        <App onBack={() => setStarted(false)} />
      ) : (
        <StarterPage onStart={() => setStarted(true)} />
      )}
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

reportWebVitals();
