import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 

function GoogleAuthHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token'); 

    if (token) {
      console.log("Google Login Success! Saving token from URL...");
      
      Cookies.set('token', token, { 
        expires: 7,              
        secure: true,             
        sameSite: 'strict'    
      });

      navigate("/");
      window.location.reload(); 
    } else {

      consle.error("No token found in Google auth callback.");
      navigate("/signin"); 
    }
  }, [location, navigate]); 

  return (
    <h2>
          กำลังเข้าสู่ระบบผ่าน Google...
    </h2>
  );
}

export default GoogleAuthHandler;
