// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from "./Providers/AuthProvider/AuthProvider";
import "./App.css";
//import AdminLayout from '@/components/Layout/Admin/Layout/AdminLayout';
import DefaultLayout from './components/Layout/DefaultLayout';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Assuming useAuth provides authentication state

  return isAuthenticated ? children : <Navigate to="/default" />;
};

const App= () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/default" element={<DefaultLayout />} />
          {/* <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            } 
          /> */}
          <Route path="*" element={<Navigate to="/default" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
