import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { Response, Request } from 'express';

interface errorResponseJson {
  statusCode: number;
  message: string;
}

class MyExceptionResponse {
  static readonly queryFailed: errorResponseJson = {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Bad query to db. e.g., inserting dup value to an unique field',
  };
  static readonly internalError: errorResponseJson = {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  };
  static genHttpExceptionResponse(
    statusCode: number,
    message: string,
  ): errorResponseJson {
    return { statusCode: statusCode, message: message };
  }
}

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = (exception as Error).message;
    this.logger.error(
      message,
      (exception as Error).stack,
      `${request.method} ${request.url}`,
    );

    let errResponse: errorResponseJson = MyExceptionResponse.internalError;
    switch (exception.constructor) {
      case HttpException:
        const statusCode = (exception as HttpException).getStatus();
        const message = (exception as HttpException).message;
        errResponse = MyExceptionResponse.genHttpExceptionResponse(
          statusCode,
          message,
        );
        break;
      case NotFoundException:
        // 404
        errResponse = MyExceptionResponse.genHttpExceptionResponse(
          (exception as NotFoundException).getStatus(),
          (exception as NotFoundException).message,
        );
        break;
      case QueryFailedError:
        errResponse = MyExceptionResponse.queryFailed;
        break;

      default:
        break;
    }

    response.status(errResponse.statusCode).json(errResponse);
  }
}
