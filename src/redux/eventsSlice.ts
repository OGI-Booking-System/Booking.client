import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventsAPI } from '../api/eventsAPI';
import type { EventsState, CreateEventRequest, UpdateEventRequest } from '../types/event.types';

const initialState: EventsState = {
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk('events/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await eventsAPI.getEvents();
    return response.data.data;
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } } };
    return rejectWithValue(error.response?.data?.message ?? 'Failed to fetch events');
  }
});

export const fetchEventById = createAsyncThunk('events/fetchOne', async (id: string, { rejectWithValue }) => {
  try {
    const response = await eventsAPI.getEventById(id);
    return response.data.data;
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } } };
    return rejectWithValue(error.response?.data?.message ?? 'Failed to fetch event');
  }
});

export const createEvent = createAsyncThunk(
  'events/create',
  async (data: CreateEventRequest, { rejectWithValue }) => {
    try {
      const response = await eventsAPI.createEvent(data);
      return response.data.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message ?? 'Failed to create event');
    }
  },
);

export const updateEvent = createAsyncThunk(
  'events/update',
  async ({ id, data }: { id: string; data: UpdateEventRequest }, { rejectWithValue }) => {
    try {
      const response = await eventsAPI.updateEvent(id, data);
      return response.data.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message ?? 'Failed to update event');
    }
  },
);

export const deleteEvent = createAsyncThunk('events/delete', async (id: string, { rejectWithValue }) => {
  try {
    await eventsAPI.deleteEvent(id);
    return id;
  } catch (err: unknown) {
    const error = err as { response?: { data?: { message?: string } } };
    return rejectWithValue(error.response?.data?.message ?? 'Failed to delete event');
  }
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventsError: (state) => {
      state.error = null;
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.currentEvent = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e.id !== action.payload);
      });
  },
});

export const { clearEventsError, setCurrentEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
