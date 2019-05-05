import React from 'react';
import Planets from './Planets.js';
import { shallow } from 'enzyme';


const mockData = [];

describe('WelcomeHome', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Planets
                      planets={mockData}
                      />)
});
it('Should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    });
});