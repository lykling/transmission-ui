/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file index
 * @author Pride Leong<lykling.lyk@gmail.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {FileManager, FileNavigator} from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';

const apiOptions = {
    ...connectorNodeV1.apiOptions,
    apiRoot: 'http://iooy.cc:8004/api/fs',
};

const fileManager = (
    <div style={{marginTop: '20px', height: '480px'}}>
        <FileManager>
            <FileNavigator
                id="filemanager"
                api={connectorNodeV1.api}
                apiOptions={apiOptions}
                capabilities={connectorNodeV1.capabilities}
                listViewLayout={connectorNodeV1.listViewLayout}
                viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
            />
        </FileManager>
    </div>
);

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(
    fileManager,
    root
);
