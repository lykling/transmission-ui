/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file transmission
 * @author Pride Leong<lykling.lyk@gmail.com>
 */

import axios from 'axios';
import uuid from 'uuid/v4';

export default class Transmission {
    constructor({host, port, path, ssl, user, pswd, sessionid}) {
        // Create transmission rpc backend instance
        this.api = axios.create({
            baseURL: `http://${host || '127.0.0.1'}${port ? `:${port}` : ''}`,
            url: path,
            method: 'POST',
        });
        if (user != null) {
            const userpswd = `${user}${pswd ? `:${pswd}` : ''}`;
            const token = `Basic ${Buffer.from(userpswd).toString('base64')}`;
            this.setApiDefaultHeader('authorization', token);
        }

        this.setApiDefaultHeader('host', `${host}:${port}`);
        this.setApiDefaultHeader('x-requested-with', 'transmission-ui');
        this.setApiDefaultHeader('x-transmission-session-id', sessionid || '');
        this.setApiDefaultHeader('content-type', 'application/json');
    }

    setApiDefaultHeader(key, val) {
        this.api.defaults.headers.common[key] = val;
    }

    verify(method, args) {
        // TODO: verify arguments
        return true;
    }

    /**
     * RPC call of transmission
     *
     * @papram {string} method name of the method to invoke
     * @param {Object} args object of key/value pairs
     * @param {string} tag used to track response,
     *  if provided, the response contain the same tag
     *
     * @return {Object} response from transmission
     *//
    async request(method, args, tag = null, retry = 3) {
        this.verify(method, args);
        if (retry < 0) {
            return null;
        }
        // TODO: Add logging for tracking
        const payload = {
            arguments: args,
            method,
            tag: tag || uuid(),
        };
        const data = JSON.stringify(payload);
        const headers = {
            'Time': new Date(),
            'Content-Length': data.length,
        };
        try {
            const resp = await this.api.request({
                headers,
                data,
            });
            return resp.data;
        }
        catch (err) {
            // Invalid session id
            if (err.response.status === 409) {
                // Store the sessionid
                this.setApiDefaultHeader(
                    'x-transmission-session-id',
                    err.response.headers['x-transmission-session-id']
                );
                return await this.request(method, args, tag, retry - 1);
            }
        }
        return null;
    }
}
