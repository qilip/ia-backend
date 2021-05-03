import KoaRouter from 'koa-router';
import { PrismaClient } from '@Prisma/client';

const api = new KoaRouter();
const prisma = new PrismaClient();

api.get('/', (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'Hi!';
});

api.get('/health', (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'ok';
});

export default api;
