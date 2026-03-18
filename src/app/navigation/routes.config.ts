import { ROUTES } from '../../config/app.constants';

export const publicRoutes = [
  { path: ROUTES.LOGIN, label: 'Login' },
  { path: ROUTES.REGISTER, label: 'Register' },
  { path: ROUTES.VERIFY_EMAIL, label: 'Verify Email' },
  { path: ROUTES.FORGOT_PASSWORD, label: 'Forgot Password' },
  { path: ROUTES.RESET_PASSWORD, label: 'Reset Password' },
];

export const userRoutes = [
  { path: ROUTES.USER.DASHBOARD, label: 'Dashboard', icon: '🏠' },
  { path: ROUTES.USER.BROWSE_EVENTS, label: 'Browse Events', icon: '🎪' },
  { path: ROUTES.USER.MY_PASSES, label: 'My Passes', icon: '🎫' },
  { path: ROUTES.USER.VERIFICATION, label: 'Verify Pass', icon: '📷' },
  { path: ROUTES.USER.PROFILE, label: 'Profile', icon: '👤' },
];

export const adminRoutes = [
  { path: ROUTES.ADMIN.DASHBOARD, label: 'Dashboard', icon: '🛠️' },
  { path: ROUTES.ADMIN.EVENTS, label: 'Events', icon: '🎪' },
  { path: ROUTES.ADMIN.PASS_VERIFICATION, label: 'Pass Verification', icon: '🔍' },
  { path: ROUTES.ADMIN.USERS, label: 'Users', icon: '👥' },
  { path: ROUTES.ADMIN.REPORTS, label: 'Reports', icon: '📊' },
  { path: ROUTES.ADMIN.SETTINGS, label: 'Settings', icon: '⚙️' },
];
