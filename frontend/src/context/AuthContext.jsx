import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { getMe } from '../libs/authService'; // Assuming getMe fetches user details

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = Cookies.get('token');
        if (token) {
          const res = await getMe();
          if (res.success) {
            setUser(res.data);
            setIsAuthenticated(true);
          } else {
            // Token might be invalid or expired
            Cookies.remove('token');
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData, token) => {
    Cookies.set('token', token, { expires: 7 }); // Store token for 7 days
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
