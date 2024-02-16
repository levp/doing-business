import express from 'express';

export function serveClientHandler(): express.RequestHandler {
  return express.static('../client-react/dist/');
}
