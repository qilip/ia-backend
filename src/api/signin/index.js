import KoaRouter from 'koa-router';

import * as signinCtrl from './signin.ctrl.js';

const register = new KoaRouter();

register.post('/identity', signinCtrl.identitySignin);

export default register;
