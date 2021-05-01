import Koa from 'koa';
import KoaRouter from 'koa-router';
// import KoaBody from 'koa-body';
// import KoaCors from 'koa-cors';
// import KoaRange from 'koa-range';
import logger from 'koa-logger';

import api from './api/index.js';

const app = new Koa();
const router = new KoaRouter();

const SERVER_PORT = process.env.SERVER__PORT || 8080;
// const SERVER_HOST = process.env.SERVER__HOST;

app.use(logger());

// Routes
router.use(api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(SERVER_PORT, () => {
    console.log(`[INFO] ili Auth Server is listening to port ${SERVER_PORT}`);
});
