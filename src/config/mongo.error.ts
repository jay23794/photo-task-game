// middleware/mongooseErrorHandler.ts
import { Error as MongooseError } from 'mongoose';
import { AppError, ValidationError, ConflictError } from '../errors';

export const handleMongooseError = (err: any): AppError => {
  // Mongoose validation error
  if (err instanceof MongooseError.ValidationError) {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    return new ValidationError(`Validation failed: ${errors.join(', ')}`);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return new ConflictError(`${field} already exists`);
  }

  // Mongoose cast error (invalid ObjectId)
  if (err instanceof MongooseError.CastError) {
    return new ValidationError(`Invalid ${err.path}: ${err.value}`);
  }

  return new AppError(err.message || 'Database error', 500, false);
};