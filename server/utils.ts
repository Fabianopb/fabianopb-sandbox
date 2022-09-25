export class NotFoundError extends Error {
  statusCode = 404;
  name = 'NotFoundError';
}
