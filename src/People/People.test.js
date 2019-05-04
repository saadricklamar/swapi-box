import React from 'react';
import People from './People.js';
import { shallow } from 'enzyme';


const mockData = [];

describe('WelcomeHome', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<People
                      people={mockData}
                      />)
});
it('Should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    });
});