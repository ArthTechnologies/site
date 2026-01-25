import type { Handle, HandleServerError } from '@sveltejs/kit';

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't crash the server - just log the error
});

// Global error handler for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't crash the server for non-fatal errors
});

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event);
};

export const handleError: HandleServerError = async ({ error, event }) => {
  console.error('Server error:', error);
  return {
    message: 'An unexpected error occurred'
  };
};
