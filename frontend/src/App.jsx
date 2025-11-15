import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Promotion from "./components/Promotion/Promotion.jsx";
import Nav from "./components/NavBar/Nav.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CookieBanner from "./components/HomePage/CookieBanner.jsx";
import "./app.css";

function App() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const location = useLocation();
  const showNav = !location.pathname.startsWith("/seller-page");

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookie = () => {
    localStorage.setItem("cookieConsent", "given");
    window.location.reload();
    setShowCookieBanner(false);
  };

  const handleDeclineCookie = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowCookieBanner(false);
  };

  return (
    <div className="flex flex-col relative">
      <Promotion />
      {showNav && <Nav />}

      <Outlet />
      <Footer />

      {showCookieBanner && (<CookieBanner onAccept={handleAcceptCookie} onDecline={handleDeclineCookie} />)}
      
    </div>
  );
}

export default App;
