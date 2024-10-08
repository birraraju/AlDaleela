import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from "./Providers/AuthProvider/AuthProvider";
import AdminLayout from './components/Layout/Admin/Layout/AdminLayout';
import DefaultLayout from './components/Layout/DefaultLayout';

const ProtectedRoute = ({ children }) => {
  const { role } = useAuth(); // Using the role to check authentication state

  console.log("Role state:", role); // Log role for debugging

  if (role === null) {
    return <div>Loading...</div>; // Show loading state while role is being determined
  }

  return role ? children : <Navigate to="/default" />; // If role exists, allow access to admin routes, otherwise redirect
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/default" element={<DefaultLayout />} />

          {/* Protected Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            } 
          />

          {/* Redirect to default for undefined routes */}
          <Route path="*" element={<Navigate to="/default" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
