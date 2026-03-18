import { useState, useCallback } from 'react';
import { bookingService } from '../services/bookingService';
import type { BookingPass, Event } from '../types/booking';

export function useBooking() {
  const [events, setEvents] = useState<Event[]>([]);
  const [passes, setPasses] = useState<BookingPass[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await bookingService.getEvents();
      setEvents(data);
    } catch {
      setError('Failed to load events.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMyPasses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await bookingService.getMyBookings();
      setPasses(data);
    } catch {
      setError('Failed to load your passes.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const bookEvent = useCallback(async (eventId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await bookingService.bookEvent({ eventId });
      return true;
    } catch {
      setError('Failed to book the event.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (passId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await bookingService.cancelBooking(passId);
      setPasses((prev) => prev.filter((p) => p.id !== passId));
      return true;
    } catch {
      setError('Failed to cancel the booking.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { events, passes, isLoading, error, fetchEvents, fetchMyPasses, bookEvent, cancelBooking };
}
