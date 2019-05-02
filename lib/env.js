/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file env.js
 * @author Pride Leong<lykling.lyk@gmail.com>
 */
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';

export const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')));

export const args = yargs.version(
    pkg.version
).env(
    'TRUI'
).option('transmission-host', {
    default: 'localhost',
}).option('transmission-port', {
    default: '9091',
}).option('transmission-path', {
    default: '/transmission/rpc'
}).option('transmission-user', {
}).option('transmission-pswd', {
}).argv;

export const settings = {};
