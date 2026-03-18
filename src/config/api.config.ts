import env from './environment';

export const API_BASE_URL = env.API_BASE_URL;

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh-token',
    verifyEmail: '/api/auth/verify-email',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    me: '/api/auth/me',
  },
  events: {
    list: '/api/events',
    byId: (id: string) => `/api/events/${id}`,
    create: '/api/events',
    update: (id: string) => `/api/events/${id}`,
    delete: (id: string) => `/api/events/${id}`,
  },
  bookings: {
    list: '/api/bookings',
    byId: (id: string) => `/api/bookings/${id}`,
    create: '/api/bookings',
    cancel: (id: string) => `/api/bookings/${id}/cancel`,
    myBookings: '/api/bookings/my',
  },
  verification: {
    verify: '/api/verification/verify',
    history: '/api/verification/history',
  },
  users: {
    list: '/api/users',
    byId: (id: string) => `/api/users/${id}`,
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`,
  },
};
