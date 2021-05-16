import prisma from '../../prisma.js';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import * as jwt from '../../modules/jwt.js';

// bcrypt salt rounds
const saltRounds = 10;

// JWT Subject
const jwtSubject = 'rev'; // Register Email Verify

export const emailRegister = async (ctx) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
  });
  
  const validateResult = schema.validate(ctx.request.body);
  if(validateResult.error){
    ctx.status = 400;
    return;
  }
  
  let existUser = null;
  try {
    existUser = await prisma.user.findUnique({
      where: {
        email: ctx.request.body.email,
      },
      select: {
        email: true,
      },
  });
  } catch(e) {
    ctx.throw(500, e);
  }

  if(existUser) {
    // TODO : 리턴하지 말고 비밀번호 리셋 이메일 전송
    ctx.status = 409;
    ctx.body = "already exist email";
    return;
  } else {
    let verifyToken = null;
    try {
      verifyToken = await jwt.sign(
        jwtSubject,
        {
          email: ctx.request.body.email,
        },
        '30m',
      );
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.status = 200;
    ctx.body = verifyToken; // 이메일 전송으로 바꾸기
  }
};

export const userRegister = async (ctx) => {
  const schema = Joi.object().keys({
    token: Joi.string().required().pattern(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, 'JWT Token'),
    password: Joi.string().required().min(8).max(200),
    name: Joi.string().required().min(3).max(20),
    nickname: Joi.string().alphanum().min(3).max(20).required(),
  });
  
  const validateResult = schema.validate(ctx.request.body);
  if(validateResult.error) {
    ctx.status = 400; // bad request
    return;
  }
  let decodedToken = null;
  try {
    decodedToken = await jwt.verify(jwtSubject, ctx.request.body.token);
  } catch (e) {
    ctx.throw(500, e);
  }
  
  const hashedPassword = await bcrypt.hash(ctx.request.body.password, saltRounds);
  
  let account = null;
  try {
  account = await prisma.user.create({
    data: {
      email: decodedToken.email,
      password: hashedPassword,
      name: ctx.request.body.name,
      nickname: ctx.request.body.nickname,
    },
  });
  } catch (e) {
    // TODO: Prisma 오류 코드별로 적절한 응답 주기
    ctx.throw(500, e);
  }
  
  ctx.status = 200;
  ctx.body = {
    name: account.name,
    nickname: account.nickname,
    email: account.email,
  };
};
