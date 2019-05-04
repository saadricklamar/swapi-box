import React from 'react';
import WelcomeHome from './WelcomeHome.js';
import { shallow } from 'enzyme';

const mockFunc = jest.fn();
const mockOpeningCrawl = 'It is a period of civil war.Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire\'s ultimate weapon, the DEATHSTAR, an armored space station with enough power to destroy an entire planet.Pursued by the Empire\'s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy.... A New Hope 1977-05-25';

describe('WelcomeHome', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WelcomeHome
                    openingCrawl={mockOpeningCrawl}
                    display={mockFunc}
                      />)
});
it('Should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    });
});
