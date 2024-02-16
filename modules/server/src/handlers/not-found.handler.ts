import express from 'express';

export function notFoundHandler(): express.RequestHandler {
  return (_req, res) => {
    res
      .status(404)
      .send('404 not found.');
  };
}
