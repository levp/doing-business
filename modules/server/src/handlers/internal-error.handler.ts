import express from 'express';

export function internalErrorHandler(): express.ErrorRequestHandler {
  return (err, _req, res, _next) => {
    console.error('Uncaught error in one of the request handlers:', err);
    res
      .status(500)
      .send('500 internal server error.');
  };
}
