export type PassStatus = 'active' | 'used' | 'expired' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  availableSlots: number;
  price: number;
  imageUrl?: string;
  organizerId: string;
  createdAt: string;
}

export interface BookingPass {
  id: string;
  userId: string;
  eventId: string;
  event: Event;
  qrCode: string;
  status: PassStatus;
  bookedAt: string;
  usedAt?: string;
}

export interface BookEventPayload {
  eventId: string;
}

export interface BookingResponse {
  pass: BookingPass;
  message: string;
}
