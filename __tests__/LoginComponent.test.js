import React from 'react';
import axios from 'axios';
import { configure, shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import LoginComponent from '../src/components/loginComponent/loginComponent';

const mockStore = configureStore();
configure({ adapter: new Adapter() });
var mock = new MockAdapter(axios);

describe('LoginComponent', () => {

    let loginComponent = shallow(<LoginComponent store={mockStore()} />);
    const resp = {
        data: {
            results: [{ name: "C-3PO", birth_year: "112BBY" }],
        },
    };
    const state = {
        username: "FOO",
        dob: "BAZ",
    };
    const preventDefault = {
        preventDefault: function(){
            return;
        },
    };

    it('has input and button', () => {
        const component = mount(<LoginComponent store={mockStore()} />);
        component.find('input#username').simulate('change', {
            target: {
                value: 'Username',
            },
        });
        component.find('input#dob').simulate('change', {
            target: {
                value: 'Dob',
            },
        });
        component.find('button#loginButton').simulate('click');
    });

    test('No network API request', () => {
        loginComponent.setState(state);
        loginComponent.instance().login(preventDefault);
        expect(loginComponent).toMatchSnapshot();
    });

    test('Login api works', () => {
        loginComponent.setState(state);
        // arguments for reply are (status, data, headers)
        mock.onGet('https://swapi.co/api/people/?search=FOO').reply(200, {
            results: [{ name: "C-3PO", birth_year: "112BBY" }],
        });
        loginComponent.instance().login(preventDefault);
        expect(loginComponent).toMatchSnapshot();
    });


    test('Login failed (invalid username)', () => {
        loginComponent.setState(state);
        loginComponent.instance().apiSuccessCallback(resp);
        expect(loginComponent.instance().state.error).toEqual("Username does not exist");
    });

    test('Login failed (invalid password)', () => {
        loginComponent.setState({
            username: "C-3PO",
            dob: "112B",
        });
        loginComponent.instance().apiSuccessCallback(resp);
        expect(loginComponent.instance().state.error).toEqual("DOB does not match");
    });

    test('Login success', () => {
        const history = createMemoryHistory('/');
        const component = shallow(
            <LoginComponent
                store={mockStore()}
                history={history}
                addUser={function(){return;}}
            />);
        component.setState({
            username: "C-3PO",
            dob: "112BBY",
        });
        component.instance().apiSuccessCallback(resp);
        expect(history.location.pathname).toEqual("/home");
    });
});