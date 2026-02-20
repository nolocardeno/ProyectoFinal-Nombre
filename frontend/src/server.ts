import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Reenviar peticiones /api — en modo dev el proxy de Vite las gestiona;
 * en producción nginx las redirige. Nunca dejar que el motor SSR las renderice.
 */
app.use('/api/{*splat}', (_req, res) => {
  res.status(404).json({ error: 'API proxy not configured' });
});

/**
 * Servir archivos estáticos desde /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Gestionar todas las demás peticiones renderizando la aplicación Angular.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Iniciar el servidor si este módulo es el punto de entrada principal,
 * o si se ejecuta mediante PM2.
 * El servidor escucha en el puerto definido por la variable de entorno `PORT`, o por defecto 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Manejador de peticiones usado por Angular CLI (dev-server y build) o Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
