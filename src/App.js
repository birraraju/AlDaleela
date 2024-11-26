


// App.js

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from "./Providers/AuthProvider/AuthProvider";
import { ThemeProvider } from './components/Layout/ThemeContext/ThemeContext';
import WebLazyLoader from './assets/LoaderMain/WebDesktopoutline.mp4'; // Path to your video
import MobileDesktopoutline from './assets/LoaderMain/mobileLoader/MobileDesktopoutline.mp4';
import './App.css';


import AdminLayout from '../src/components/Layout/Admin/Layout/AdminLayout';
 import DefaultLayout from  './components/Layout/DefaultLayout'
  import UserActivation from '../src/components/email/UserActivation';

// Splash Video Loader
const SplashVideoLoader = ({ onFinish }) => {
  const [isMobile, setIsMobile] = useState(false);



  useEffect(() => {
    // Function to detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
  <video
    src={isMobile ? MobileDesktopoutline : WebLazyLoader} // Conditional video source
    autoPlay
    muted
    className="w-full h-full object-cover" // Ensure full screen
    onEnded={onFinish} // Trigger when the video finishes
  >
    Your browser does not support the video tag.
  </video>
</div>

  );
};

  


const App = () => {
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  if (!isVideoFinished) {
    return <SplashVideoLoader onFinish={() => setIsVideoFinished(true)} />;
  }

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
        {/* <Suspense fallback={<TimedVideoLoader timeout={100000} />}> */}
            <MainRoutes />
          {/* </Suspense> */}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const MainRoutes = () => {
  const location = useLocation();
  const { role } = useAuth();
  console.log("Role App js:", role);

  return (
    <Routes>
      <Route
        path={`/${process.env.REACT_APP_BASE_URL}`}
        element={<DefaultLayout role={role} />}
      >
        <Route
          path=":LayerId/:objectid"
          element={<DefaultLayout role={role} />}
        />
      </Route>
      <Route
        path="/admin"
        element={<AdminLayout role={role} />}
      />
      <Route
        path={`/${process.env.REACT_APP_BASE_URL}/activate/:userId`}
        element={<UserActivation />}
      />
      {/* Catch-All Redirect */}
      <Route
        path="*"
        element={<Navigate to={`/${process.env.REACT_APP_BASE_URL}`} state={{ from: location }} replace />}
      />
    </Routes>
  );
};

export default App;
