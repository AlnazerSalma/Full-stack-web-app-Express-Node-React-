import React from 'react';
import AnimatedSlider from "../components/animated_slider/StarterPageSlider";
import useFetch from "../utils/useFetch";
import "../style/Starter.css";

function StarterPage({ onStart }) {
  const {
    data: sliderItems,
    loading,
    error,
  } = useFetch("http://localhost:5000/api/sliders");
  return (
    <section className="starter-section">
      <div className="starter-left">
        <h1 className="starter-heading">
          Hi There!{" "}
          <span className="wave" role="img" aria-labelledby="wave">
            👋🏻
          </span>
        </h1>
        <h2 className="starter-subheading">
          {
            "I'M a designer working \nwith startups globally.\nCurrently steering the \nship at "
          }
          <strong className="main-name hover-link" onClick={onStart}>
            Haptic.
          </strong>
        </h2>

        {loading && <p className="loading-message">{loading}</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && <AnimatedSlider items={sliderItems} />}
      </div>

      <div className="starter-icon">
        <span className="wave" role="img" aria-labelledby="wave">
          ⌛
        </span>
      </div>
    </section>
  );
}

export default StarterPage;
