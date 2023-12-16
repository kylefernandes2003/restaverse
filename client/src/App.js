// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ReviewList from './components/ReviewList';
import Navbar from './components/Navbar';
import ReplyForm from './components/ReplyForm';
import ReviewDetails from './components/ReviewDetails';
import Auth from './auth/auth';


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
      // Check if the user is logged in when the component mounts
      fetch('/protected', { credentials: 'include' })
          .then(response => {
              if (response.ok) {
                  setLoggedIn(true);
              }
          })
          .catch(error => console.error('Error fetching user:', error));
  }, []);

  const renderNavbar = () => {
    // Render Navbar only if the user is logged in and the route is not '/login'
    return loggedIn && location.pathname !== '/login' ? <Navbar /> : null;
  };

    return (
      <div>
          {renderNavbar()} {/* Call the renderNavbar function */}
          <Routes>
              <Route path="/login" element={<Auth />} />
              {loggedIn ? (
                  <>
                      <Route path="/" element={<ReviewList />} />
                      <Route path="/reply/:id" element={<ReplyForm />} />
                      <Route path="/details/:id" element={<ReviewDetails />} />
                  </>
              ) : (
                <Route path="/" element={<Navigate to="/login" />} />
              )}
          </Routes>
      </div>
      
    );
}

export default App;
