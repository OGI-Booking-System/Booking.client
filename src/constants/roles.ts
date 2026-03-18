import type { UserRole } from '../types/user';

export const ROLES: Record<string, UserRole> = {
  ATTENDEE: 'attendee',
  ORGANIZER: 'organizer',
  ADMIN: 'admin',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  attendee: 'Attendee',
  organizer: 'Organizer',
  admin: 'Administrator',
};
