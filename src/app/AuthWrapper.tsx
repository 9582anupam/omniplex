"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthState, setUserDetailsState } from "@/store/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setAuthState(true));
        dispatch(
          setUserDetailsState({
            uid: user.uid,
            name: user.displayName ?? "",
            email: user.email ?? "",
            profilePic: user.photoURL ?? "",
          })
        );
      } else {
        dispatch(setAuthState(false));
        console.log("User is signed out");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  return <>{children}</>;
};

export default AuthWrapper;
