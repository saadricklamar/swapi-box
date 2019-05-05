import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { shallow } from 'enzyme';


describe('App', () => {
  let mockEvent;
  let mockOpeningCrawl;
  let mockDisplayPeople;
  let mockPerson;
  let mockPeople;
  let wrapper;

  beforeEach(() => {
    mockEvent = {target:{value: 'e'}}
    mockOpeningCrawl = 'It is a period of civil war.Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire\'s ultimate weapon, the DEATHSTAR, an armored space station with enough power to destroy an entire planet.Pursued by the Empire\'s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy.... A New Hope 1977-05-25';
    mockDisplayPeople = jest.fn()
    mockPeople = [
      {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair"},
      {name: "C-3PO", height: "167", mass: "75", hair_color: "n/a", skin_color: "gold"},
      {name: "R2-D2", height: "96", mass: "32", hair_color: "n/a", skin_color: "white, blue"}
    ]
    wrapper = shallow(<App
                      />)
  })
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockPeople)
    }))
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Should have default states', () => {
    expect(wrapper.state()).toEqual ({
      opening: '',
      people: [],
      planets: [],
      vehicles: [],
      movieCrawl: true,
      buttonValue: ''
    });
  });
  it('fetches pepople when the people button is clicked', () => {
    const url = 'https://swapi.co/api/people'
    wrapper.setState({people: mockPeople})
    wrapper.instance().displayPeople(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(url)
  });
  it('should return a parsed response if status is ok', async () => {
    const result = await mockDisplayPeople(mockEvent);
    expect(result).toEqual(mockPeople);
  })
  it('should return an error if status is not ok', async () => {
    window.fetch = jest.fn().mockImplementataion(() => {
        return Promise.resolve({
            ok: false
        })
    })
    await expect(displayPeople()).rejects.toEqual(Error('Error'))
  })
  it('sets the state of buttonValue when a button is clicked', () => {
    expect(wrapper.state('buttonValue')).toEqual('')
    const mockEvent = {target:{value: 'people'}}
    wrapper.instance().displayPeople(mockEvent);
    expect(wrapper.state('buttonValue')).toEqual('people')
  })
  it('should change the state of movieCrawl', () => {
    expect(wrapper.state('movieCrawl')).toEqual(true);
    const mockEvent = {target:{value: 'e'}}
    wrapper.instance().displayPeople(mockEvent);
    expect(wrapper.state('movieCrawl')).toEqual(false);
  });
});