import Prisma from '@prisma/client';

// Prisma is a commonJS module -> https://github.com/prisma/prisma/pull/4920
const { PrismaClient } = Prisma;
let prisma = new PrismaClient();

// logs the time taken for a Prisma Query to run
if(process.env.NODE_ENV !== "production"){
  prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});
}

export default prisma;
