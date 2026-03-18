import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookingAPI } from '../api/bookingAPI';
import type { BookingState, CreateBookingRequest } from '../types/booking.types';

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
};

export const fetchMyBookings = createAsyncThunk('bookings/fetchMy', async (_, { rejectWithValue }) => {
  try {
    const response = await bookingAPI.getMyBookings();
    return response.data.data;
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } } };
    return rejectWithValue(error.response?.data?.message ?? 'Failed to fetch bookings');
  }
});

export const createBooking = createAsyncThunk(
  'bookings/create',
  async (data: CreateBookingRequest, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.createBooking(data);
      return response.data.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message ?? 'Failed to create booking');
    }
  },
);

export const cancelBooking = createAsyncThunk('bookings/cancel', async (id: string, { rejectWithValue }) => {
  try {
    const response = await bookingAPI.cancelBooking(id);
    return response.data.data;
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } } };
    return rejectWithValue(error.response?.data?.message ?? 'Failed to cancel booking');
  }
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBooking = action.payload;
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      });
  },
});

export const { clearBookingError, setCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
