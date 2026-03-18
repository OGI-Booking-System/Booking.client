export const APP_NAME = 'BookPass';

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  USED: 'used',
} as const;

export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'bookpass_access_token',
  REFRESH_TOKEN: 'bookpass_refresh_token',
  USER: 'bookpass_user',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER: {
    DASHBOARD: '/user/dashboard',
    BROWSE_EVENTS: '/user/events',
    BOOK_PASS: '/user/events/:eventId/book',
    MY_PASSES: '/user/passes',
    VERIFICATION: '/user/verify',
    PROFILE: '/user/profile',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    EVENTS: '/admin/events',
    PASS_VERIFICATION: '/admin/verify',
    USERS: '/admin/users',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
  },
} as const;
