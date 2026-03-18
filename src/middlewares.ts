import type { Middleware } from '@reduxjs/toolkit';

export const loggerMiddleware: Middleware = (/* store */) => (next) => (action) => {
  if (import.meta.env.DEV) {
    console.groupCollapsed(`[Redux] ${String((action as { type: string }).type)}`);
    console.log('Action:', action);
    console.groupEnd();
  }
  return next(action);
};
