/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file agent/index.js
 * @author Pride Leong<lykling.lyk@gmail.com>
 */
import Koa from 'koa';
import session from 'koa-session';
import routes from './routes';

const app = new Koa();

app.keys = ['transmission-ui'];
app.use(session({
    key: 'trui:sess',
    maxAge: 8640000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
}, app));

app.use(routes.routes(), routes.allowedMethods());
app.listen(8004);
