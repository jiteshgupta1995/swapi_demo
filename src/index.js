import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from "./components/loginComponent/loginComponent";
import HomeContainer from "./components/containers/homeContainer";
import { BrowserRouter, Route } from 'react-router-dom';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {Switch} from "react-router";
import './app.scss';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={LoginComponent} />
                <Route exact path='/home' component={HomeContainer} />
                <Route component={LoginComponent}/>
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);