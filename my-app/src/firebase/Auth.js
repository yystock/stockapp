import React, { useState, useEffect } from 'react';
import {auth} from './Firebase';
import axios from 'axios';
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log("2")
      setLoading(false);
    });   
    
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};