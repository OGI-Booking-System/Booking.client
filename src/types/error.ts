export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface FormError {
  field: string;
  message: string;
}
