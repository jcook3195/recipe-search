import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export const ProtectedRoute = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
        } else {
            setAuthUser(null);
        }
    });

    return () => {
        listen();
    }
  }, []);

  if (!authUser) {
    // user is not authenticated
    //return <Navigate to="/" />;
  }

  return children;
};