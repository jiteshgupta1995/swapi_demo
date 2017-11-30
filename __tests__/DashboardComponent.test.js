import React from 'react';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import DashboardComponent from '../src/components/homeComponent/dashboardComponent';

const mockStore = configureStore();
configure({ adapter: new Adapter() });

describe('HomeComponent', () => {

    test('found result from redux store and api is working', () => {
        const items = [
            {name: "Pluto", population: "unknown"},
            {name: "Earth", population: "1000"},
        ];
        const component = shallow(
            <DashboardComponent
                store={mockStore()}
                searchItem={items}
            />
        ).instance();
        expect(component).toMatchSnapshot();
    });
});