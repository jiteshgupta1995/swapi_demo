import React from 'react';
import ReactDOM from 'react-dom';
import LoginContainer from "./containers/loginContainer";
import HomeContainer from "./containers/homeContainer";
import { BrowserRouter, Route } from 'react-router-dom';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {Switch} from "react-router";
import "./app.scss";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={LoginContainer} />
                <Route exact path='/home' component={HomeContainer} />
                <Route component={LoginContainer}/>
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);