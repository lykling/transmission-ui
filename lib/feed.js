/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file feed
 * @author Pride Leong<lykling.lyk@gmail.com>
 */
import {Feed} from './modules';
import xml from 'fast-xml-parser';
import axios from 'axios';

export async function list(params, reqid) {
    const feeds = await Feed.findAll();
    return {
        reqid,
        data: feeds,
    };
}

export async function add(params, reqid) {
    const feed = Feed.build({
        url: params.url,
    });
    await feed.save();
    return {
        reqid,
        data: {
            feedid: feed.feedid,
            url: feed.url,
            createAt: feed.createAt,
            updateAt: feed.updateAt,
        },
    };
}

export async function update(params, reqid) {
    const feed = Feed.findOne({
        where: {
            feedid: params.feedid,
        },
    });
    if (feed == null) {
        return {
            reqid,
            data: null,
        };
    }
    const req = await axios.get(feed.url);
    const data = xml.parse(req.data);
    return {
        reqid,
        data,
    };
}
