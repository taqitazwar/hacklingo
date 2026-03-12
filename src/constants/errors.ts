export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'No internet connection. Please check your network.',
  LOAD_FAILED: 'Failed to load content. Please try again.',
  SAVE_FAILED: 'Failed to save progress. Please try again.',
  INVALID_LESSON: 'This lesson could not be found.',
  SESSION_EXPIRED: 'Your session has expired. Please restart the app.',
  GENERIC: 'Something went wrong. Please try again.',
} as const;

export type ErrorCode = keyof typeof ERROR_MESSAGES;

export function getErrorMessage(code: ErrorCode): string {
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.GENERIC;
}
