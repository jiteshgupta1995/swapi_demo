import React from 'react';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import LoginComponent from '../src/components/loginComponent/loginComponent';

const mockStore = configureStore();
configure({ adapter: new Adapter() });

var mock = new MockAdapter(axios);


describe('LoginComponent', () => {

    it('is changing the username, dob and error value', () => {
        const login = shallow(<LoginComponent store={mockStore()} />).dive().instance();
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
        event.target.id = "error";
        login.onChangeHandler(event,'error');
        expect(login.state.error).toEqual('error');
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

    test('Login api works', () => {
        const component = shallow(<LoginComponent store={mockStore()} />).dive();
        component.setState({
            username: "FOO",
            dob: "BAZ",
        });

        // arguments for reply are (status, data, headers)
        mock.onGet('https://swapi.co/api/people/?search=FOO').reply(200, {
            results: [{name: "C-3PO", birth_year: "112BBY"}],
        });
        component.instance().login();
        expect(component).toMatchSnapshot();
    });

    test('Login failed (invalid username)', () => {
        const component = shallow(<LoginComponent store={mockStore()} />).dive();
        component.setState({
            username: "3PO",
            dob: "BAZ",
        });
        var resp = {
            data: {
                results: [{name: "C-3PO", birth_year: "112BBY"}],
            },
        };
        component.instance().apiSuccessCallback(resp);
        expect(component.instance().state.error).toEqual("Username does not exist");
    });

    test('Login failed (invalid password)', () => {
        const component = shallow(<LoginComponent store={mockStore()} />).dive();
        component.setState({
            username: "C-3PO",
            dob: "112B",
        });
        var resp = {
            data: {
                results: [{name: "C-3PO", birth_year: "112BBY"}],
            },
        };
        component.instance().apiSuccessCallback(resp);
        expect(component.instance().state.error).toEqual("DOB does not match");
    });
});