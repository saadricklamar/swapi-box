import React from 'react';
import Vehicles from './Vehicles.js';
import { shallow } from 'enzyme';


const mockData = [];

describe('WelcomeHome', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Vehicles
                      vehicles={mockData}
                      />)
});
it('Should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    });
});