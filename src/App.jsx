import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import { AuthProvider } from './context/AuthContext';

import PublicLayout from './components/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';

import Landing from './pages/Landing';
import Discussion from './pages/Discussion';
import SupportHub from './pages/SupportHub';
import Complaints from './pages/Complaints';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManagePosts from './pages/Admin/ManagePosts';
import ManageComplaints from './pages/Admin/ManageComplaints';
import SiteSettings from './pages/Admin/SiteSettings';


export default function App() {
  return (
    <HashRouter>
      <AppDataProvider>
        <AuthProvider>
          <Routes>
            {/* Admin login sits outside the public layout (no navbar) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin panel */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="posts" element={<ManagePosts />} />
              <Route path="complaints" element={<ManageComplaints />} />
              <Route path="settings" element={<SiteSettings />} />
            </Route>

            {/* Public site */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/discussion" element={<Discussion />} />
              <Route path="/support" element={<SupportHub />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </AppDataProvider>
    </HashRouter>
  );
}

function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-500">404</p>
      <h1 className="mt-3 text-xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-500">The page you're looking for doesn't exist or was moved.</p>
      <Link to="/" className="btn-primary mt-6"> Back to home</Link>
    </div>  
  );
}
