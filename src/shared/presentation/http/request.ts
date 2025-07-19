export interface HttpRequest<T> {
  body?: T;
  params?: any;
  query?: any;
  headers?: any;
  ip?: string;
  method?: string;
  url?: string;
}
