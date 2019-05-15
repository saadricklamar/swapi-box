import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { shallow } from 'enzyme';


describe('App', () => {
  let mockEvent;
  let mockDisplayPeople = jest.fn()
  let mockDisplayPlanets = jest.fn()
  let mockDisplayVehicles = jest.fn()
  let mockPeople = [
    {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair"},
    {name: "C-3PO", height: "167", mass: "75", hair_color: "n/a", skin_color: "gold"},
    {name: "R2-D2", height: "96", mass: "32", hair_color: "n/a", skin_color: "white, blue"}
  ];
  let mockPlanets = [
    {name: "Alderaan", rotation_period: "24", orbital_period: "364", diameter: "12500", climate: "temperate"},
    {name: "Yavin IV", rotation_period: "24", orbital_period: "4818", diameter: "10200", climate: "temperate, tropical"},
    {name: "Hoth", rotation_period: "23", orbital_period: "549", diameter: "7200", climate: "frozen"}
  ]
  let mockVehicles = [
    {name: "Sand Crawler", model: "Digger Crawler", manufacturer: "Corellia Mining Corporation", cost_in_credits: "150000", length: "36.8"},
    {name: "T-16 skyhopper", model: "T-16 skyhopper", manufacturer: "Incom Corporation", cost_in_credits: "14500", length: "10.4"},
    {name: "X-34 landspeeder", model: "X-34 landspeeder", manufacturer: "SoroSuub Corporation", cost_in_credits: "10550", length: "3.4"}
  ]
  let wrapper;

  beforeEach(() => {
    mockEvent = {target:{value: 'e'}}
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
  it('sets the state of buttonValue when a button is clicked', () => {
    expect(wrapper.state('buttonValue')).toEqual('')
    const mockEvent = {target:{value: 'people'}}
    wrapper.instance().displayPeople(mockEvent);
    expect(wrapper.state('buttonValue')).toEqual('people')
  })
  it('should change the state of movieCrawl', () => {
    expect(wrapper.state('movieCrawl')).toEqual(true);
    wrapper.instance().displayPeople(mockEvent);
    expect(wrapper.state('movieCrawl')).toEqual(false);
  });
  it('ComponentDidMount', () => {
    const urlFilms = 'https://swapi.co/api/films';
    wrapper = shallow(<App/>)
    expect(window.fetch).toHaveBeenCalledWith(urlFilms)
  })

  //Testing fetch data for people

  it('fetches pepople when the people button is clicked', () => {
    const url = 'https://swapi.co/api/people'
    wrapper.setState({people: mockPeople})
    wrapper.instance().displayPeople(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(url)
  });
  // it('should return a parsed response if status is ok', () => {
  //   const result = mockDisplayPeople(mockEvent);
  //   expect(result).toEqual(mockPeople);
  // })
  it('if people fetch fails, error displays', async() => {
    const url = 'https://swapi.co/api/people';
    fetch = jest.fn().mockImplementation(() => Promise.resolve({ok: false, status: 500}));
    try {
      await mockDisplayPeople(url)
    } catch(error) {
      expect(error.message).toBe('Error')
    }
  })

  //Testing fetch data for planets

  it('fetches planets when the planets button is clicked', () => {
    const url = 'https://swapi.co/api/planets'
    wrapper.setState({planets: mockPlanets})
    wrapper.instance().displayPlanets(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(url)
  });
  it('if planets fetch fails, error displays', async() => {
    const url = 'https://swapi.co/api/planets';
    fetch = jest.fn().mockImplementation(() => Promise.resolve({ok: false, status: 500}));
    try {
      await mockDisplayPlanets(url)
    } catch(error) {
      expect(error.message).toBe('Error')
    }
  })

   //Testing fetch data for vehicles

  it('fetches vehicles when the vehicles button is clicked', () => {
    const url = 'https://swapi.co/api/vehicles'
    wrapper.setState({vehicles: mockVehicles})
    wrapper.instance().displayVehicles(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(url)
  });
  it('if vehicles fetch fails, error displays', async() => {
    const url = 'https://swapi.co/api/vehicles';
    fetch = jest.fn().mockImplementation(() => Promise.resolve({ok: false, status: 500}));
    try {
      await mockDisplayVehicles(url)
    } catch(error) {
      expect(error.message).toBe('Error')
    }
  })

 
});