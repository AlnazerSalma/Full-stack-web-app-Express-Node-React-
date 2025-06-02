import React,{ Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";


// Lazy loaded pages
const Home = lazy(() => import("../pages/HomePage"));
const Work = lazy(() => import("../pages/WorkPage"));
const Pricing = lazy(() => import("../pages/PricingPage"));
const Careers = lazy(() => import("../pages/CareerPage"));
const Contact = lazy(() => import("../pages/ContactPage"));


const AppRouter = ({ load }) => {
  return (
    <Router>
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
          <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/work" element={<Work />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </Suspense>
      </div>
       <Footer />
    </Router>
  );
};

export default AppRouter;
