import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 
import { useAuth } from "../../context/AuthContext";
import { getMe } from "../../services/authService";

function GoogleAuthHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token'); 

      if (token) {
        console.log("Google Login Success! Saving token from URL...");
        Cookies.set('token', token, { 
          expires: 7,              
          secure: true,             
          sameSite: 'strict'    
        });

        try {
          const meResponse = await getMe();
          if (meResponse.success) {
            login(meResponse.data, token);
            navigate("/");
          } else {
            console.error("Failed to fetch user data after Google login.", meResponse.message);
            Cookies.remove('token'); // Clear potentially bad token
            navigate("/signin");
          }
        } catch (error) {
          console.error("Error fetching user data after Google login:", error);
          Cookies.remove('token');
          navigate("/signin");
        }
      } else {
        console.error("No token found in Google auth callback.");
        navigate("/signin"); 
      }
    };

    handleAuth();
  }, [location, navigate, login]); 

  return (
    <h2>
          กำลังเข้าสู่ระบบผ่าน Google...
    </h2>
  );
}

export default GoogleAuthHandler;
