import KoaRouter from 'koa-router';
import bcrypt from 'bcrypt';

import register from './register/index.js'
import signin from './signin/index.js'

const api = new KoaRouter();

//bcrypt
const saltRounds = 10;

api.get('/', (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'Hi!';
});

api.get('/health', (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'ok';
});

api.get('/hash/:value', async (ctx, next) => {
  const { value } = ctx.params;
  const hashed = await bcrypt.hash(value, saltRounds);
  const result = await bcrypt.compare('asdf', hashed);
  ctx.status = 200;
  ctx.body = {
    hashed,
    result
  };
});

api.use('/register', register.routes());
api.use('/signin', signin.routes());

export default api;
