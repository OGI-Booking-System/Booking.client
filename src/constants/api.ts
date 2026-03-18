export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH_TOKEN: '/auth/refresh-token',
  AUTH_VERIFY_EMAIL: '/auth/verify-email',
  AUTH_ME: '/auth/me',
  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
  BOOK_EVENT: '/bookings/book',
  // Events
  EVENTS: '/events',
  EVENT_BY_ID: (id: string) => `/events/${id}`,
  // Verification
  VERIFY_QR: '/verification/verify',
  VERIFICATION_HISTORY: '/verification/history',
  // Profile
  PROFILE: '/profile',
  UPDATE_PROFILE: '/profile/update',
} as const;
