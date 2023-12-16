import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';  
import "../Styles/login.css";
import Typography from "@mui/material/Typography";
import { useAuth } from "../components/AuthContext";

async function getUserInfo(codeResponse) {
  var response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: codeResponse.code }),
  });
  return await response.json();
}

export default function Auth() {
  
  const { loggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  //called when user clicks on log in 
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const loginDetails = await getUserInfo(codeResponse);
      console.log('Login Details:', loginDetails);
      login();
      navigate('/');
    },
  });

  const handleLogout = () => {
    fetch("/logout", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(() => {
        logout(); // Use the logout function from useAuth
        navigate('/login'); // Navigate to the login page
    })
    .catch(error => console.error('Error logging out:', error));
  };

  return (
    <div className="credentials">
      {!loggedIn ? (
        <div className="loginbtn">
            <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={() => googleLogin()}
            >
            <GoogleIcon fontSize="large" />
            <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
              Log in using Google
            </Typography>
            </IconButton>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}