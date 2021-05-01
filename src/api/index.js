import KoaRouter from 'koa-router';

const api = new KoaRouter();

api.get('/', (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'Hi!';
});

api.get('/health', (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'ok';
});

export default api;
