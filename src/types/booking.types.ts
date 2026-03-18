export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'used';

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  status: BookingStatus;
  passId: string;
  qrCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  eventId: string;
}

export interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
}
