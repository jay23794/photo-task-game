
import { ZodError } from 'zod';

export class ZodValidationError extends Error {
  public statusCode: number;
  public errors: Array<{
    field: string;
    message: string;
  }>;

  constructor(zodError: ZodError) {
    super('Validation failed');
    this.name = 'ZodValidationError';
    this.statusCode = 400;
    
    // Transform Zod errors into a cleaner format
    this.errors = zodError.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message
    }));

    Error.captureStackTrace(this, this.constructor);
  }
}