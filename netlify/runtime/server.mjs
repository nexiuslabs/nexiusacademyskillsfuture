import http from 'node:http';

import { handler as adminLeads } from '../functions/admin-leads.mjs';
import { handler as adminLogin } from '../functions/admin-login.mjs';
import { handler as adminLogout } from '../functions/admin-logout.mjs';
import { handler as adminSession } from '../functions/admin-session.mjs';
import { handler as captureQuizResult } from '../functions/capture-quiz-result.mjs';
import { handler as validateAssessmentInvite } from '../functions/validate-assessment-invite.mjs';

const FUNCTION_PREFIX = '/.netlify/functions/';
const MAX_BODY_BYTES = 1024 * 1024;

export const handlers = {
  'admin-leads': adminLeads,
  'admin-login': adminLogin,
  'admin-logout': adminLogout,
  'admin-session': adminSession,
  'capture-quiz-result': captureQuizResult,
  'validate-assessment-invite': validateAssessmentInvite,
};

const json = (response, statusCode, body) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(body));
};

const readBody = async (request) => {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error('Request body too large');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString('utf8');
};

export const createServer = () =>
  http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url || '/', 'http://academy-functions');

      if (url.pathname === '/healthz') {
        return json(response, 200, { ok: true });
      }

      if (!url.pathname.startsWith(FUNCTION_PREFIX)) {
        return json(response, 404, { error: 'Not found' });
      }

      const functionName = url.pathname.slice(FUNCTION_PREFIX.length);
      const handler = handlers[functionName];
      if (!handler || functionName.includes('/')) {
        return json(response, 404, { error: 'Function not found' });
      }

      const result = await handler({
        httpMethod: request.method,
        headers: request.headers,
        body: await readBody(request),
        path: url.pathname,
        rawUrl: `http://${request.headers.host || 'academy-functions'}${request.url || '/'}`,
        queryStringParameters: Object.fromEntries(url.searchParams),
      });

      response.writeHead(result.statusCode || 200, result.headers || {});
      response.end(result.body || '');
    } catch (error) {
      json(response, error.statusCode || 500, {
        error: error.statusCode ? error.message : 'Internal server error',
      });
    }
  });

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT || 8080);
  const server = createServer();
  server.listen(port, '0.0.0.0', () => {
    process.stdout.write(`Academy functions listening on port ${port}\n`);
  });
}
