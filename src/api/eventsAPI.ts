import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../config/api.config';
import type { Event, CreateEventRequest, UpdateEventRequest } from '../types/event.types';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '../types/api.types';

export const eventsAPI = {
  getEvents: (params?: PaginationParams) =>
    axiosInstance.get<PaginatedResponse<Event>>(API_ENDPOINTS.events.list, { params }),

  getEventById: (id: string) =>
    axiosInstance.get<ApiResponse<Event>>(API_ENDPOINTS.events.byId(id)),

  createEvent: (data: CreateEventRequest) =>
    axiosInstance.post<ApiResponse<Event>>(API_ENDPOINTS.events.create, data),

  updateEvent: (id: string, data: UpdateEventRequest) =>
    axiosInstance.put<ApiResponse<Event>>(API_ENDPOINTS.events.update(id), data),

  deleteEvent: (id: string) =>
    axiosInstance.delete<ApiResponse<null>>(API_ENDPOINTS.events.delete(id)),
};
