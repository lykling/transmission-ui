/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file modules
 * @author Pride Leong<lykling.lyk@gmail.com>
 */

import uuid from 'uuid/v4';
import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './transmission.sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

export const Feed = sequelize.define('feed', {
    feedid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        default: uuid,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isUrl: true,
        },
    },
}, {
    tableName: 'tr_feed',
    underscored: true,
    timestamps: true,
    createAt: 'create_at',
    updateAt: 'update_at',
    deleteAt: 'delete_at',
    paranoid: true,
});
Feed.sync();

export default sequelize;
