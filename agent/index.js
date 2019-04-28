/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file agent/index.js
 * @author Pride Leong<lykling.lyk@gmail.com>
 */
import path from 'path';
import express from 'express';
import filemanager from '@opuscapita/filemanager-server';

const app = express();

const config = {
    fsRoot: './',
    rootName: '/',
};
app.use('/api/fs', filemanager.middleware(config));
app.use('/', express.static(path.resolve(__dirname, '../sense')));

app.listen('8004', err => {
    // logger
});
