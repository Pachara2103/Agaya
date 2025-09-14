import { useState } from "react";
import {Outlet} from 'react-router-dom';
import Promotion from "./components/Promotion/Promotion.jsx";
import Nav from "./components/NavBar/Nav.jsx";
import Footer from "./components/Footer/Footer.jsx";
import TestUserFetch from "./components/TestUserFetch.jsx";
import Homepage from "./components/HomePage/Home";
import ChangePasswordForm from './components/ProfilePage/ChangePasswordForm.jsx';
import SetNewPasswordPage from './components/ProfilePage/SetNewPassword.jsx';
import ChangePasswordSuccess from "./components/ProfilePage/ChangePasswordSuccess.jsx";
import "./app.css";

function App() {
  const [count, setCount] = useState(0);
  let buttonArray = ["Home", " New Arrivals", "Sign in", ""];

  return (
    <div className="app-container">
      <Promotion />
      <Nav />

      <main className="main-content">
        <Outlet />
      </main>
    
    <Footer />
    </div>
  );
}

export default App;
