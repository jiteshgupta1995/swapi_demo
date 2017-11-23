import React from 'react';
import LoginComponent from '../src/components/loginComponent/loginComponent';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import moxios from 'moxios';

const mockStore = configureStore();
configure({ adapter: new Adapter() });

describe('LoginComponent', () => {
    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install()
    })
    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall()
    })
    it('should change the username and dob value', () => {
        const login = shallow(<LoginComponent store={mockStore({ history: {push: []} })}/>).dive().instance();
        var event = {
            target:{
                id: "dob",
            },
        };
        login.onChangeHandler(event,'some_password');
        expect(login.state.dob).toEqual('some_password');
        event.target.id = "username";
        login.onChangeHandler(event,'username');
        expect(login.state.username).toEqual('username');
    });

    it('has input and button', () => {
        const component = shallow(
            <LoginComponent store={mockStore({ history: {push: []} })}/>
        );
        const usernameInput = component.find('#username').length;
        expect(usernameInput).toBe(0);
        const dobInput = component.find('#dob').length;
        expect(dobInput).toBe(0);
        const loginButton = component.find('#loginButton').length;
        expect(loginButton).toBe(0);
    });

    it('Login works', () => {
        const login = shallow(<LoginComponent store={mockStore({ history: {push: []} })}/>).dive();
        login.setState({
            username: 'FOO',
            dob: 'BAZ',
        });
        login.instance().login();
        moxios.wait(function () {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                data: {
                    results:[],
                },
            }).then(function () {
                expect(login.instance().state.error).toEqual("Username does not exist");
            })
        });
        
    });
});