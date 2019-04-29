/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file api route
 * @author Pride Leong<lykling.lyk@gmail.com>
 */
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import * as hydra from '../../lib/hydra';
import * as feed from '../../lib/feed';
import _ from 'lodash';
import {User} from '../../lib/modules';

const router = new Router();

router.post('/*', bodyparser({
}));

// Check xsrf token first
router.post('/*', async (ctx, next) => {
    const token = ctx.get('x-xsrf-token');
    if (ctx.session.xsrf.token !== token) {
        // Invalid token
        ctx.status = 400;
        ctx.body = JSON.stringify({
            code: 1,
            message: 'xsrf token error',
        });
        return;
    }
    await next();
});

router.post('/feed', async (ctx, next) => {
    try {
        const method = ctx.request.body.method;
        const response = await _.get(feed, method, _.noop)(
            ctx.request.body.params, ctx.request.body.reqid
        );
        ctx.body = {
            code: 0,
            response,
            error: null,
        };
    }
    catch (err) {
        ctx.status = 500;
        ctx.body = {
            code: 1,
            response: null,
            error: {
                errno: 500,
                message: 'Fail to call method of feed',
            },
        };
    }
});

export default router;
