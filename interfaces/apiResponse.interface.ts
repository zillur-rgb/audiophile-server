export type IApiResponse<T> = {
  statusCode: number;
  success: true;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T | null;
};
