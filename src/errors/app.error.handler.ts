import { Request, Response, NextFunction } from "express";
import { AppError } from "./app.errors";

interface ErrorResponse {
    success: false;
    message: string;
    statusCode: number;
    stack?: string;
    errors?: any;
}


export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = err;
    // Convert non-AppError to AppError
    if (!(error instanceof AppError)) {
        const statusCode = 500;
        const message = error.message || 'Internal Server Error';
        error = new AppError(message, statusCode, false);
    }

    const appError = error as AppError;
    const isProduction = process.env.NODE_ENV === 'production';

    const response: ErrorResponse = {
        success: false,
        message: appError.message,
        statusCode: appError.statusCode,
    };

    // Include stack trace in development
    if (!isProduction) {
        response.stack = appError.stack;
    }
    console.error('ERROR 💥:', {
        message: appError.message,
        statusCode: appError.statusCode,
        stack: appError.stack,
        isOperational: appError.isOperational,
    });

    // Send error to monitoring service in production (e.g., Sentry)
    if (isProduction && !appError.isOperational) {
        // Sentry.captureException(appError);
    }

    res.status(appError.statusCode).json(response);
};
