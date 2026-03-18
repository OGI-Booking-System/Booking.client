import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { logoutUser } from '../redux/authSlice';
import { ROUTES, APP_NAME } from '../config/app.constants';
import Avatar from './Avatar';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate(ROUTES.LOGIN);
  };

  const dashboardRoute = user?.role === 'admin' ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.DASHBOARD;

  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 24px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    }}>
      <Link to={isAuthenticated ? dashboardRoute : ROUTES.HOME} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 24 }}>🎫</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#6366f1' }}>{APP_NAME}</span>
      </Link>

      {isAuthenticated && user && (
        <nav style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {user.role === 'user' && (
            <>
              <Link to={ROUTES.USER.BROWSE_EVENTS} style={navLinkStyle}>Events</Link>
              <Link to={ROUTES.USER.MY_PASSES} style={navLinkStyle}>My Passes</Link>
              <Link to={ROUTES.USER.VERIFICATION} style={navLinkStyle}>Verify</Link>
            </>
          )}
          {user.role === 'admin' && (
            <>
              <Link to={ROUTES.ADMIN.EVENTS} style={navLinkStyle}>Events</Link>
              <Link to={ROUTES.ADMIN.PASS_VERIFICATION} style={navLinkStyle}>Verify</Link>
              <Link to={ROUTES.ADMIN.USERS} style={navLinkStyle}>Users</Link>
            </>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link to={user.role === 'admin' ? ROUTES.ADMIN.SETTINGS : ROUTES.USER.PROFILE} style={{ textDecoration: 'none' }}>
              <Avatar firstName={user.firstName} lastName={user.lastName} size={32} />
            </Link>
            <button
              onClick={handleLogout}
              style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 13, color: '#374151' }}
            >
              Logout
            </button>
          </div>
        </nav>
      )}

      {!isAuthenticated && (
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to={ROUTES.LOGIN} style={{ ...navLinkStyle, padding: '6px 16px', border: '1px solid #6366f1', borderRadius: 6 }}>
            Login
          </Link>
          <Link to={ROUTES.REGISTER} style={{ padding: '6px 16px', background: '#6366f1', color: '#fff', borderRadius: 6, textDecoration: 'none', fontSize: 14 }}>
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#374151',
  fontSize: 14,
  fontWeight: 500,
};
