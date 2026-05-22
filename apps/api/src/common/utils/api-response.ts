export class ApiResponseWrapper<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  meta?: Record<string, unknown>;

  static success<T>(data: T, meta?: Record<string, unknown>): ApiResponseWrapper<T> {
    const response = new ApiResponseWrapper<T>();
    response.success = true;
    response.data = data;
    response.error = null;
    response.meta = meta;
    return response;
  }

  static error<T>(message: string): ApiResponseWrapper<T> {
    const response = new ApiResponseWrapper<T>();
    response.success = false;
    response.data = null;
    response.error = message;
    return response;
  }
}
