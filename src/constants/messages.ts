export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Logged in successfully.',
    LOGOUT_SUCCESS: 'Logged out successfully.',
    REGISTER_SUCCESS: 'Account created! Please verify your email.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    UNAUTHORIZED: 'You must be logged in to access this page.',
    FORBIDDEN: 'You do not have permission to access this page.',
  },
  BOOKING: {
    BOOK_SUCCESS: 'Pass booked successfully!',
    BOOK_ERROR: 'Failed to book the pass. Please try again.',
    NO_PASSES: 'You have no booked passes yet.',
    PASS_CANCELLED: 'Pass cancelled successfully.',
  },
  QR: {
    VALID: 'QR code is valid.',
    INVALID: 'QR code is invalid.',
    USED: 'This pass has already been used.',
    EXPIRED: 'This pass has expired.',
    SCAN_ERROR: 'Failed to scan QR code. Please try again.',
  },
  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_WEAK:
      'Password must be at least 8 characters and include uppercase, lowercase, and a number.',
    FIRST_NAME_REQUIRED: 'First name is required.',
    LAST_NAME_REQUIRED: 'Last name is required.',
    PASSWORDS_MISMATCH: 'Passwords do not match.',
  },
} as const;
