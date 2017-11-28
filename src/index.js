import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from "./components/loginComponent/loginComponent";
import HomeComponent from "./components/homeComponent/homeComponent";
import { BrowserRouter, Route } from 'react-router-dom';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {Switch} from "react-router";

const store = createStore(rootReducer);
// store.subscribe(() => console.warn('store', store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={LoginComponent} />
                <Route path='/home' component={HomeComponent} />
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
