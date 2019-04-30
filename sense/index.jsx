/**
 * Copyright (C) 2019 All rights reserved.
 *
 * @file index
 * @author Pride Leong<lykling.lyk@gmail.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import _ from 'lodash';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import request from './request';

const styles = theme => ({
    main: {
    },
    paper: {
    },
    scopes: {
    },
    form: {
    },
    buttons: {
    },
    button: {
    }
});

function Index(props) {
    const [state, setState] = React.useState({
        data: null,
        error: new Error('loading'),
    });
    React.useEffect(async () => {
        const resp = await request('/api/feed', {}, {method: 'list', params: {}, reqid: uuid()});
        setState({
            data: resp.data,
            error: null,
        });
    }, []);

    const inputEl = React.useRef(null);

    async function add() {
        const url = inputEl.current.value;
        console.log(`url: ${url}`);
        await request('/api/feed', {}, {method: 'add', params: {url}, reqid: uuid()});
    }
    return (
        <div>
            {state.error == null
            ? (
                <ul>
                    {_.map(state.data, x => (
                        <li>
                            {x.url}
                        </li>
                    ))}
                </ul>
            )
            : (
                <em>{state.error.stack}</em>
            )
            }
            <input ref={inputEl} type="text" />
            <button onClick={add}>
                Add
            </button>
        </div>
    );
}
Index.propTypes = {
    classes: PropTypes.object.isRequired,
};
const Component = withStyles(styles)(Index);

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(
    <Component />,
    root
);
