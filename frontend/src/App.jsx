import { useState, useEffect } from "react";
import {Outlet} from 'react-router-dom';
import Promotion from "./components/Promotion/Promotion.jsx";
import Nav from "./components/NavBar/Nav.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CookieBanner from './components/HomePage/CookieBanner.jsx';
import "./app.css";

function App() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookie = () => {
    localStorage.setItem('cookie_consent', 'given');
    setShowCookieBanner(false);
  };

  const handleDeclineCookie = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowCookieBanner(false);
  };

  return (
    <div className="app-container">
      <Promotion />
      <Nav />

      <main className="main-content">
        <Outlet />
      </main>
    
    <Footer />

    {showCookieBanner && (
      <CookieBanner onAccept={handleAcceptCookie} onDecline={handleDeclineCookie} />
    )}
    </div>
  );
}

export default App;
