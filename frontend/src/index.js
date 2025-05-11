import React, { useState } from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' instead of 'react-dom'
import "./index.css";
import App from "./App";
import StarterPage from "./pages/StarterPage.jsx";
import reportWebVitals from "./reportWebVitals";

const Root = () => {
  const [started, setStarted] = useState(false);

  return (
    <React.StrictMode>
      {started ? (
        <App />
      ) : (
        <StarterPage onStart={() => setStarted(true)} />
      )}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

reportWebVitals();

