import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/api';
import type { BookingPass, BookEventPayload, BookingResponse, Event } from '../types/booking';

export const bookingService = {
  async getEvents(): Promise<Event[]> {
    const { data } = await apiClient.get<Event[]>(API_ENDPOINTS.EVENTS);
    return data;
  },

  async getEventById(id: string): Promise<Event> {
    const { data } = await apiClient.get<Event>(API_ENDPOINTS.EVENT_BY_ID(id));
    return data;
  },

  async bookEvent(payload: BookEventPayload): Promise<BookingResponse> {
    const { data } = await apiClient.post<BookingResponse>(API_ENDPOINTS.BOOK_EVENT, payload);
    return data;
  },

  async getMyBookings(): Promise<BookingPass[]> {
    const { data } = await apiClient.get<BookingPass[]>(API_ENDPOINTS.BOOKINGS);
    return data;
  },

  async getBookingById(id: string): Promise<BookingPass> {
    const { data } = await apiClient.get<BookingPass>(API_ENDPOINTS.BOOKING_BY_ID(id));
    return data;
  },

  async cancelBooking(id: string): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(API_ENDPOINTS.BOOKING_BY_ID(id));
    return data;
  },
};
