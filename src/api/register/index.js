import KoaRouter from 'koa-router';

import * as registerCtrl from './register.ctrl.js';

const register = new KoaRouter();

register.post('/email', registerCtrl.emailRegister);
register.post('/', registerCtrl.userRegister);

export default register;
