import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import store from './redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';

// Log changes in the store
store.subscribe(() => {
    console.log(store.getState());
})

ReactDOM.render(
    <Provider store = { store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);