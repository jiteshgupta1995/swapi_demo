import React from 'react';
import axios from 'axios';
import { configure, shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import HomeComponent from '../src/components/homeComponent/homeComponent';

const mockStore = configureStore();
configure({ adapter: new Adapter() });

describe('HomeComponent', () => {

    var mock = new MockAdapter(axios);
    // arguments for reply are (status, data, headers)
    mock.onGet('https://swapi.co/api/planets/?search=pl').reply(200, {
        results: [{ name: "Pluto", population: "1000" }],
    });

    const callback = function(){return};
    const history = createMemoryHistory('/home');
    const invalidComponent = shallow(
        <HomeComponent
            history={history}
            user=""
            addSearch={callback}
            removeSearch={callback}
            removeUser={callback}
        />
    ).instance();

    test('invalid user, Signout success', () => {
        expect(history.location.pathname).toEqual("/");
        expect(invalidComponent).toMatchSnapshot();
    });

    const homeHistory = createMemoryHistory('/home');
    const homeComponent = shallow(
        <HomeComponent store={mockStore()}
            history={homeHistory}
            user="Some user"
            addSearch={callback}
            removeSearch={callback}
            removeUser={callback}
        />
    ).instance();

    it('has input and signout button', () => {
        const history = createMemoryHistory('/');
        const component = mount(
            <HomeComponent
                store={mockStore()}
                history={history}
                user=""
                addSearch={callback}
                removeSearch={callback}
                removeUser={callback}
            />
        );
        const userInput = component.find('input#userInput').length;
        expect(userInput).toBe(1);
        const signoutBtn = component.find('button#signoutBtn').length;
        expect(signoutBtn).toBe(1);
    });

    it('is calling API Success, sorts data', () => {
        let resp = {
            data: {
                results: [
                    { name: "Pluto", population: "500" },
                    { name: "Mars", population: "unknown" },
                    { name: "Earth", population: "10000" },
                    { name: "Venus", population: "600" },
                ],
            },
        };
        let sorted = [
            { name: "Earth", population: "10000" },
            { name: "Venus", population: "600" },
            { name: "Pluto", population: "500" },
            { name: "Mars", population: "unknown" },
        ];
        homeComponent.setState({
            username: "C-3PO",
            dob: "112B",
        });
        homeComponent.apiSuccessCallback(resp);
        expect(homeComponent.state.searchItem).toEqual(sorted);
    });

    it('is searching for min 2 characters', () => {
        let event = {
            target: {
                value: "p",
            },
        };
        homeComponent.onChangeHandler(event);
        expect(homeComponent.state.timer).toEqual(null);
        event.target.value = "pl";
        jest.useFakeTimers();
        homeComponent.onChangeHandler(event);
        jest.runAllTimers();
        expect(homeComponent.state.timer).not.toEqual(null);
    });


    test('No network API request', () => {
        homeComponent.getResult("https://swapi.co/api/planets/?search=ab", "ab");
        expect(homeComponent).toMatchSnapshot();
    });

    test('found result from redux store and api is working', () => {
        let store = {
            result: {
                name: "Earth",
                population: "1000",
            },
            keyword: "ea",
        };
        homeComponent.props.search.push(store);
        store = {
            result: {
                name: "Pluto",
                population: "unknown",
            },
            keyword: "pl",
        };
        homeComponent.props.search.push(store);
        homeComponent.getResult("https://swapi.co/api/planets/?search=pl", "pl");
        expect(homeComponent).toMatchSnapshot();
    });
});