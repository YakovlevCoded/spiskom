export interface ApiErrorBody {
  message?: string;
  fields?: Record<string, string>;
}

export type FormErrors = Record<string, string>;
