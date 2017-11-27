import React from 'react';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import HomeComponent from '../src/components/homeComponent/homeComponent';

const mockStore = configureStore();
configure({ adapter: new Adapter() });

var mock = new MockAdapter(axios);

describe('HomeComponent', () => {

    it('is calling API Success, sorts data', () => {
        const component = shallow(<HomeComponent store={mockStore()} />).dive();
        component.setState({
            username: "C-3PO",
            dob: "112B",
        });
        var resp = {
            data: {
                results: [
                    {name: "Pluto", population: "500"},
                    {name: "Earth", population: "10000"},
                ],
            },
        };
        var sorted = [
            {name: "Earth", population: "10000"},
            {name: "Pluto", population: "500"},
        ];
        component.instance().apiSuccessCallback(resp);
        expect(component.instance().state.searchItem).toEqual(sorted);
    });

    test('API is working', () => {
        const component = shallow(<HomeComponent store={mockStore()} />).dive();

        mock.onGet('https://swapi.co/api/planets/?search=aa').reply(200, {
            results: [{name: "Pluto", population: "500"}],
        });
        component.instance().getResult("https://swapi.co/api/planets/?search=aa", "aa");
        // api is called code need to be added here
    });


    it('is searching for min 2 characters', () => {
        const home = shallow(<HomeComponent store={mockStore()} />).dive().instance();
        var event = {
            target:{
                value: "a",
            },
        };
        // arguments for reply are (status, data, headers)
        mock.onGet('https://swapi.co/api/planets/?search=aa').reply(200, {
            results: [{name: "C-3PO", birth_year: "112BBY", population: "1000"}],
        });
        home.onChangeHandler(event);
        expect(home.state.timer).toEqual(null);
        event.target.value = "aa";
        home.onChangeHandler(event,'username');
        expect(home.state.timer).not.toEqual(null);
    });
});