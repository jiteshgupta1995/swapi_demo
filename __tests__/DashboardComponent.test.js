import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DashboardComponent from '../src/components/homeComponent/dashboardComponent';

configure({ adapter: new Adapter() });

describe('DashboardComponent', () => {

    it('is rendering search result', () => {
        const items = [
            {name: "Pluto", population: "unknown"},
            {name: "Earth", population: "1000"},
        ];
        const component = shallow(
            <DashboardComponent
                searchItem={items}
            />
        ).instance();
        expect(component).toMatchSnapshot();
    });
});