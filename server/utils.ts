import { DateTime } from 'luxon';

export class BadRequestError extends Error {
  statusCode = 400;
  name = 'BadRequestError';
}

export class UnauthorizedError extends Error {
  statusCode = 401;
  name = 'UnauthorizedError';
}

export class ForbiddenError extends Error {
  statusCode = 403;
  name = 'ForbiddenError';
}

export class NotFoundError extends Error {
  statusCode = 404;
  name = 'NotFoundError';
}

export const getGMTTimestamp = () => DateTime.utc().toFormat('dd/LLL/yyyy:HH:mm:ss +0000');
