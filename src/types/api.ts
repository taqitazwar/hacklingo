export interface ApiResponse<T> {
  data: T;
  error: null;
  status: number;
}

export interface ApiError {
  data: null;
  error: {
    code: string;
    message: string;
  };
  status: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export function isApiError<T>(result: ApiResult<T>): result is ApiError {
  return result.error !== null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
