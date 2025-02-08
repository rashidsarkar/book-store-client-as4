export type ValidationError = {
  success: false;
  message: string;
  statusCode: number;
  error?: {
    path: string;
    message: string;
  }[];
  stack?: string;
};
