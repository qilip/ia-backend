import KoaRouter from 'koa-router';

import register from './register/index.js'
import signin from './signin/index.js'

const api = new KoaRouter();

api.get('/', (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'Hi!';
});

api.get('/health', (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'ok';
});

api.use('/register', register.routes());
api.use('/signin', signin.routes());

export default api;
