/* eslint-disable max-classes-per-file */
export class NotFoundError extends Error {
  status: number;

  constructor(message = 'Not Found') {
    super(message);
    this.name = this.constructor.name;
    this.status = 404;
  }
}

export class UnauthenticatedError extends Error {
  status: number;

  constructor(message = 'Unauthenticated') {
    super(message);
    this.name = this.constructor.name;
    this.status = 401;
  }
}
