import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../config/api.config';
import type { Booking, CreateBookingRequest } from '../types/booking.types';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '../types/api.types';

export const bookingAPI = {
  getMyBookings: (params?: PaginationParams) =>
    axiosInstance.get<PaginatedResponse<Booking>>(API_ENDPOINTS.bookings.myBookings, { params }),

  getAllBookings: (params?: PaginationParams) =>
    axiosInstance.get<PaginatedResponse<Booking>>(API_ENDPOINTS.bookings.list, { params }),

  getBookingById: (id: string) =>
    axiosInstance.get<ApiResponse<Booking>>(API_ENDPOINTS.bookings.byId(id)),

  createBooking: (data: CreateBookingRequest) =>
    axiosInstance.post<ApiResponse<Booking>>(API_ENDPOINTS.bookings.create, data),

  cancelBooking: (id: string) =>
    axiosInstance.patch<ApiResponse<Booking>>(API_ENDPOINTS.bookings.cancel(id)),
};
