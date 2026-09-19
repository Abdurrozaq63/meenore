import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class PostgresExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception &&
      exception.code === '23505'
    ) {
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: 'Resource already exists',
      });
    }
    throw exception;
  }
}
