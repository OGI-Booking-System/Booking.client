type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

type NotificationListener = (notification: Notification) => void;

let _counter = 0;

const listeners: NotificationListener[] = [];

export const notifications = {
  subscribe(listener: NotificationListener): () => void {
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  },
  emit(type: NotificationType, message: string, duration = 4000): void {
    const notification: Notification = {
      id: `notif-${++_counter}`,
      type,
      message,
      duration,
    };
    listeners.forEach((l) => l(notification));
  },
  success(message: string, duration?: number): void {
    this.emit('success', message, duration);
  },
  error(message: string, duration?: number): void {
    this.emit('error', message, duration);
  },
  info(message: string, duration?: number): void {
    this.emit('info', message, duration);
  },
  warning(message: string, duration?: number): void {
    this.emit('warning', message, duration);
  },
};
