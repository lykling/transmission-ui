/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file feed
 * @author Pride Leong<lykling.lyk@gmail.com>
 */
import {Feed} from './modules';

export async function add(params, reqid) {
    const feed = Feed.build({
        url: params.url,
    });
    await feed.save();
    return {
        feedid: feed.feedid,
        url: feed.url,
        createAt: feed.createAt,
        updateAt: feed.updateAt,
    };
}
