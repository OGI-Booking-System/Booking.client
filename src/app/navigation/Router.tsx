import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../../config/app.constants';
import ProtectedRoute from '../../components/ProtectedRoute';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Auth
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';
import EmailVerification from '../../features/auth/EmailVerification';
import PasswordReset from '../../features/auth/PasswordReset';

// User screens
import UserDashboard from '../../features/user/screens/Dashboard';
import BrowseEvents from '../../features/user/screens/BrowseEvents';
import BookPass from '../../features/user/screens/BookPass';
import MyPasses from '../../features/user/screens/MyPasses';
import Verification from '../../features/user/screens/Verification';
import Profile from '../../features/user/screens/Profile';

// Admin screens
import AdminDashboard from '../../features/admin/screens/Dashboard';
import EventsManagement from '../../features/admin/screens/EventsManagement';
import PassVerification from '../../features/admin/screens/PassVerification';
import UserManagement from '../../features/admin/screens/UserManagement';
import Reports from '../../features/admin/screens/Reports';
import Settings from '../../features/admin/screens/Settings';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.VERIFY_EMAIL} element={<EmailVerification />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<PasswordReset />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<PasswordReset />} />

        {/* User routes */}
        <Route
          path={ROUTES.USER.DASHBOARD}
          element={<ProtectedRoute requiredRole="user"><Layout><UserDashboard /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.USER.BROWSE_EVENTS}
          element={<ProtectedRoute requiredRole="user"><Layout><BrowseEvents /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.USER.BOOK_PASS}
          element={<ProtectedRoute requiredRole="user"><Layout><BookPass /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.USER.MY_PASSES}
          element={<ProtectedRoute requiredRole="user"><Layout><MyPasses /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.USER.VERIFICATION}
          element={<ProtectedRoute requiredRole="user"><Layout><Verification /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.USER.PROFILE}
          element={<ProtectedRoute requiredRole="user"><Layout><Profile /></Layout></ProtectedRoute>}
        />

        {/* Admin routes */}
        <Route
          path={ROUTES.ADMIN.DASHBOARD}
          element={<ProtectedRoute requiredRole="admin"><Layout><AdminDashboard /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.ADMIN.EVENTS}
          element={<ProtectedRoute requiredRole="admin"><Layout><EventsManagement /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.ADMIN.PASS_VERIFICATION}
          element={<ProtectedRoute requiredRole="admin"><Layout><PassVerification /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.ADMIN.USERS}
          element={<ProtectedRoute requiredRole="admin"><Layout><UserManagement /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.ADMIN.REPORTS}
          element={<ProtectedRoute requiredRole="admin"><Layout><Reports /></Layout></ProtectedRoute>}
        />
        <Route
          path={ROUTES.ADMIN.SETTINGS}
          element={<ProtectedRoute requiredRole="admin"><Layout><Settings /></Layout></ProtectedRoute>}
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
