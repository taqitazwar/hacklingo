/**
 * API configuration and endpoint constants.
 * Placeholder for future backend integration.
 */

export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.hacklingo.app/v1';

export const API_TIMEOUT_MS = 10000;

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
  user: {
    profile: '/user/profile',
    progress: '/user/progress',
    streak: '/user/streak',
    leaderboard: '/user/leaderboard',
  },
  curriculum: {
    languages: '/curriculum/languages',
    sections: (langId: string) => `/curriculum/${langId}/sections`,
    lessons: (sectionId: string) => `/curriculum/sections/${sectionId}/lessons`,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
