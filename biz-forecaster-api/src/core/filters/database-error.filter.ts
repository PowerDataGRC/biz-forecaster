import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * A custom exception filter to catch and handle database-related errors,
 * specifically from the 'pg' driver, which TypeORM uses for PostgreSQL.
 *
 * This filter identifies known error codes (like unique constraint violations)
 * and transforms them into standard HTTP responses, preventing raw database
 * errors from leaking to the client.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    // Default to 500 Internal Server Error if the exception is not an HttpException
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Log the full exception for debugging purposes
    this.logger.error(`Exception caught: ${exception.message}`, exception.stack);

    let responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: 'Internal server error',
    };

    // Check if this is a database error from the 'pg' driver
    if (exception.code) {
      switch (exception.code) {
        // PostgreSQL error code for unique_violation
        case '23505':
          responseBody.statusCode = HttpStatus.CONFLICT;
          responseBody.message = `Conflict: A record with the provided information already exists. Detail: ${exception.detail}`;
          break;
        // PostgreSQL error code for foreign_key_violation
        case '23503':
          responseBody.statusCode = HttpStatus.BAD_REQUEST;
          responseBody.message = `Bad Request: A related record was not found. Detail: ${exception.detail}`;
          break;
        // Add other specific database error codes here as needed
      }
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}

