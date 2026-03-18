export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  endDate: string;
  capacity: number;
  availableSeats: number;
  price: number;
  status: EventStatus;
  imageUrl?: string;
  organizer: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  location: string;
  date: string;
  endDate: string;
  capacity: number;
  price: number;
  imageUrl?: string;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  status?: EventStatus;
}

export interface EventsState {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
}
