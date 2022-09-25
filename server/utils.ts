export class BadRequestError extends Error {
  statusCode = 400;
  name = 'BadRequestError';
}

export class UnauthorizedError extends Error {
  statusCode = 402;
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
