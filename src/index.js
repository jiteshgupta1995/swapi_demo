import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import LoginComponent from "./components/loginComponent/loginComponent";
import HomeComponent from "./components/homeComponent/homeComponent";
import { BrowserRouter, Route } from 'react-router-dom';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';


const store = createStore(rootReducer);
store.subscribe(() => console.warn('store', store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <CookiesProvider>
            <BrowserRouter>
                <div>
                    <Route path='/' component={App} />
                    <Route path='/login' component={LoginComponent} />
                    <Route path='/home' component={HomeComponent} />
                </div>
            </BrowserRouter>
        </CookiesProvider>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
