// App.js
import { BrowserRouter, Routes, Route, Navigate,useLocation } from 'react-router-dom';
import { AuthProvider,useAuth } from "./Providers/AuthProvider/AuthProvider";
import { ThemeProvider } from './components/Layout/ThemeContext/ThemeContext';
import AdminLayout from '../src/components/Layout/Admin/Layout/AdminLayout';
import DefaultLayout from './components/Layout/DefaultLayout';
import UserActivation from '../src/components/email/UserActivation';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <MainRoutes />
          </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
  );
}

const MainRoutes = () => {
  const location = useLocation();
  const { role } = useAuth();
  console.log("Role App js:", role)
  // role === "admin" &&
  return (
    <div >
      <Routes>
        <Route path={`/${process.env.REACT_APP_BASE_URL}`} element={<DefaultLayout role={role} />} >
          <Route path=":LayerId/:objectid" element={<DefaultLayout role={role} />} />
        </Route>
        {<Route path="/admin" element={<AdminLayout role={role} />} />} 
        <Route path={`/${process.env.REACT_APP_BASE_URL}/activate/:userId`} element={<UserActivation/>} />
        <Route path="*" element={<Navigate to={process.env.REACT_APP_BASE_URL} replace />} />
         {/* Catch-All Redirect */}
         <Route path="*" element={<Navigate to={`/${process.env.REACT_APP_BASE_URL}`} state={{ from: location }} replace />} />

      </Routes>
    </div>
  );
}

export default App;
