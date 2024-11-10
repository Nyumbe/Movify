import React, { createContext, useContext, useState, useEffect} from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

// 

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign up function
    const signup = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };

  // Log in function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }  
  // Log out function
  const logout = () => signOut(auth);

  // Set up user state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export {useAuth, AuthProvider};