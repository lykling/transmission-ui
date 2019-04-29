/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file static router
 * @author Pride Leong<lykling.lyk@gmail.com>
 */
import path from 'path';
import Router from 'koa-router';
import serve from 'koa-static';
import uuid from 'uuid/v4';

const router = new Router();

async function addXsrfToken(ctx, next) {
    // Add signup random token to session, verity it in post request
    ctx.session.xsrf = {
        token: uuid(),
        timestamp: new Date(),
    };
    ctx.cookies.set(
        'oiiam:xsrftoken',
        ctx.session.xsrf.token,
        {
            domain: 'iooy.cc',
            path: '/',
            maxAge: 30 * 60 * 1000,
            httpOnly: false,
            sameSite: 'strict',
            overwrite: false,
        }
    );
    await next();
}

router.get('/*', addXsrfToken);

router.get('/*', serve(path.join(__dirname, '../..', 'sense'), {
    extensions: ['html'],
}));

export default router;
