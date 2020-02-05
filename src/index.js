import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import './index.css';

import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const initialState = {
    items: [
        {
            id: 0,
            name: "Test 1",
        },
        {
            id: 1,
            name: "Test 2",
        },
        {
            id: 2,
            name: "Test 3",
        },
        {
            id: 3,
            name: "Test 4",
        },
        {
            id: 4,
            name: "Test 5",
        },
    ],
};

function items(state = {}, action) {
    switch (action.type) {
    case "DELETE_ITEM":
        return state.filter(item => item.id !== action.id);
    default:
        return state;
    }
}

const reducer = combineReducers({
    items,
});

let store = createStore(reducer, initialState);

console.log('store', store);
console.log('store state', store.getState());

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
