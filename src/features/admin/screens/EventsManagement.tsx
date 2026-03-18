import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchEvents, createEvent, deleteEvent } from '../../../redux/eventsSlice';
import { createEventSchema, type CreateEventFormData } from '../../../lib/validators';
import type { Event } from '../../../types/event.types';
import EventCard from '../../../components/EventCard';
import Modal from '../../../components/Modal';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';

export default function EventsManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, isLoading, error } = useSelector((state: RootState) => state.events);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
  });

  useEffect(() => {
    void dispatch(fetchEvents());
  }, [dispatch]);

  const onSubmit = async (data: CreateEventFormData) => {
    if (editEvent) {
      // update not wired here for brevity
    } else {
      await dispatch(createEvent(data));
    }
    setShowModal(false);
    reset();
    setEditEvent(null);
  };

  const handleEdit = (event: Event) => {
    setEditEvent(event);
    setShowModal(true);
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      void dispatch(deleteEvent(eventId));
    }
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#111827' }}>Events Management 🎪</h1>
          <p style={{ margin: '4px 0 0', color: '#6b7280' }}>Create and manage events</p>
        </div>
        <button onClick={() => { setEditEvent(null); reset(); setShowModal(true); }} style={{ padding: '10px 20px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 500 }}>
          + New Event
        </button>
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} showActions onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editEvent ? 'Edit Event' : 'Create Event'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {[
            { name: 'title', label: 'Title', type: 'text', placeholder: 'Event title' },
            { name: 'location', label: 'Location', type: 'text', placeholder: 'Venue' },
            { name: 'date', label: 'Start Date', type: 'datetime-local', placeholder: '' },
            { name: 'endDate', label: 'End Date', type: 'datetime-local', placeholder: '' },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{field.label}</label>
              <input type={field.type} placeholder={field.placeholder} {...register(field.name as keyof CreateEventFormData)} style={{ width: '100%', padding: '8px 10px', border: `1px solid ${errors[field.name as keyof CreateEventFormData] ? '#f87171' : '#d1d5db'}`, borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }} />
              {errors[field.name as keyof CreateEventFormData] && <p style={{ color: '#ef4444', fontSize: 12, margin: '2px 0 0' }}>{errors[field.name as keyof CreateEventFormData]?.message}</p>}
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Capacity</label>
              <input type="number" {...register('capacity', { valueAsNumber: true })} style={{ width: '100%', padding: '8px 10px', border: `1px solid ${errors.capacity ? '#f87171' : '#d1d5db'}`, borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Price ($)</label>
              <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} style={{ width: '100%', padding: '8px 10px', border: `1px solid ${errors.price ? '#f87171' : '#d1d5db'}`, borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Description</label>
            <textarea rows={3} {...register('description')} style={{ width: '100%', padding: '8px 10px', border: `1px solid ${errors.description ? '#f87171' : '#d1d5db'}`, borderRadius: 6, fontSize: 13, boxSizing: 'border-box', resize: 'vertical' }} />
            {errors.description && <p style={{ color: '#ef4444', fontSize: 12, margin: '2px 0 0' }}>{errors.description.message}</p>}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 16px', background: '#f3f4f6', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '8px 20px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>
              {editEvent ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
