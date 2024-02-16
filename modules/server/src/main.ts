import express from 'express';
import {serveClientHandler} from './handlers/serve-client.handler.js';
import {notFoundHandler} from './handlers/not-found.handler.js';
import {internalErrorHandler} from './handlers/internal-error.handler.js';

main().catch(err => {
  console.error('Uncaught error in main():', err);
});

async function main():Promise<void> {
  const app = express();
  app.use(serveClientHandler());
  app.use(notFoundHandler());
  app.use(internalErrorHandler());
  await launchServer(app);
}

async function launchServer(app: express.Express):Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve();
    });
    app.on('error', (err) => {
      console.error('Error in server:', err);
      reject(err);
    });
  });
}
