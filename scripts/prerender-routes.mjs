import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer as createViteServer } from 'vite';

const SITE_URL = 'https://academy.nexiuslabs.com';
const DIST_DIR = path.resolve('dist');
const ROOT_DIR = path.resolve('.');
const REACT_ROUTER_ENTRY = path.resolve('node_modules/react-router/dist/development/index.mjs');
const REACT_ROUTER_DOM_ENTRY = path.resolve('node_modules/react-router-dom/dist/index.mjs');
const REACT_ROUTER_DOM_EXPORT_ENTRY = path.resolve('node_modules/react-router/dist/development/dom-export.mjs');
const REACT_HELMET_ASYNC_ENTRY = path.resolve('node_modules/react-helmet-async/lib/index.esm.js');
const MIN_RENDERED_TEXT_LENGTH = 600;

const normalizeRoutePath = (url) => {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return '/';
  return pathname.replace(/\/$/, '');
};

const routeFilePath = (routePath) => {
  if (routePath === '/') return path.join(DIST_DIR, 'index.html');
  return path.join(DIST_DIR, routePath.replace(/^\//, ''), 'index.html');
};

const readSitemapRoutes = () => {
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  return urls
    .filter((url) => url.startsWith(SITE_URL))
    .map(normalizeRoutePath);
};

const textContentLength = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;

const silenceExpectedSsrWarnings = () => {
  const originalError = console.error;
  const originalWarn = console.warn;
  const shouldSilence = (args) => {
    const [firstArg] = args;
    return (
      typeof firstArg === 'string' &&
      (
        firstArg.startsWith('Warning: useLayoutEffect does nothing on the server') ||
        firstArg.startsWith('Warning: React does not recognize the `fetchPriority` prop')
      )
    );
  };

  console.error = (...args) => {
    if (shouldSilence(args)) {
      return;
    }

    originalError(...args);
  };
  console.warn = (...args) => {
    if (shouldSilence(args)) {
      return;
    }

    originalWarn(...args);
  };

  return () => {
    console.error = originalError;
    console.warn = originalWarn;
  };
};

const renderRoutes = async () => {
  const routes = readSitemapRoutes();
  const vite = await createViteServer({
    root: ROOT_DIR,
    server: { middlewareMode: true },
    resolve: {
      alias: [
        { find: 'react-router/dom', replacement: REACT_ROUTER_DOM_EXPORT_ENTRY },
        { find: 'react-router-dom', replacement: REACT_ROUTER_DOM_ENTRY },
        { find: 'react-router', replacement: REACT_ROUTER_ENTRY },
        { find: 'react-helmet-async', replacement: REACT_HELMET_ASYNC_ENTRY },
      ],
    },
    ssr: { noExternal: ['react-router', 'react-router-dom', 'react-helmet-async'] },
    appType: 'custom',
    logLevel: 'warn',
  });
  silenceExpectedSsrWarnings();

  try {
    const { AppShell } = await vite.ssrLoadModule('/App.tsx');
    const { MemoryRouter } = await vite.ssrLoadModule('/node_modules/react-router-dom/dist/index.mjs');
    const { HelmetProvider } = await vite.ssrLoadModule('/node_modules/react-helmet-async/lib/index.esm.js');

    for (const routePath of routes) {
      const htmlPath = routeFilePath(routePath);
      if (!fs.existsSync(htmlPath)) {
        throw new Error(`Missing HTML file for ${routePath}: ${htmlPath}`);
      }

      const ssrLocation = routePath === '/' ? '/' : `${routePath}/`;
      const helmetContext = {};
      const appHtml = renderToString(
        React.createElement(
            HelmetProvider,
            { context: helmetContext },
            React.createElement(
            MemoryRouter,
            { initialEntries: [ssrLocation] },
            React.createElement(AppShell),
          ),
        ),
      );

      const renderedTextLength = textContentLength(appHtml);
      if (renderedTextLength < MIN_RENDERED_TEXT_LENGTH) {
        throw new Error(
          `Prerendered body for ${routePath} is too small (${renderedTextLength} chars). Route may not have matched.`,
        );
      }

      let html = fs.readFileSync(htmlPath, 'utf8');
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      fs.writeFileSync(htmlPath, html);
      console.log(`Prerendered ${routePath} (${renderedTextLength} text chars)`);
    }
  } finally {
    await vite.close();
  }
};

renderRoutes().catch((error) => {
  console.error(error);
  process.exit(1);
});
