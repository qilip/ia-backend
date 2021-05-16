import prisma from '../../prisma.js';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import * as jwt from '../../modules/jwt.js';

// JWT Subject
const jwtSubject = 'ili'; // ili

export const identitySignin = async (ctx) => {
  const schema = Joi.object().keys({
    identity: Joi.string().required().min(3).max(200),
    password: Joi.string().required().min(8).max(200),
  });
  
  const validateResult = schema.validate(ctx.request.body);
  if(validateResult.error) {
    ctx.status = 400; // bad request
    return;
  }
  
  let user = null;

  try {
    user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: ctx.request.body.identity,
          },
          {
            nickname: ctx.request.body.identity,
          },
        ],
      },
      select: {
        id: true,
        uuid: true,
        email: true,
        password: true,
        name: true,
        nickname: true,
        role: true,
        profileImage: true,
      },
  });
  } catch(e) {
    ctx.throw(500, e);
  }
  
  if(user === null) {
    ctx.status = 200;
    ctx.body = 'Wrong identity or password';
    return;
  }
  
  const passwordMatch = await bcrypt.compare(ctx.request.body.password, user.password);
  
  if(passwordMatch) {
    ctx.body = user;
    // TODO: 로그인 처리
  } else {
    ctx.status = 200;
    ctx.body = 'Wrong identity or password';
    return;
  }
};
