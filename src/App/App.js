import React, { Component } from 'react';
import './App.css';
import WelcomeHome from '../WelcomeHome/WelcomeHome';
import People from '../People/People';
import Planets from '../Planets/Planets';
import Vehicles from '../Vehicles/Vehicles';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opening: '',
      people: [],
      planets: [],
      vehicles: [],
      movieCrawl: true,
      buttonValue: ''
    }
  }

  fetchMovieCrawl = arry => {
    let movie = arry[0].opening_crawl + '- ' + arry[0].title + ', ' + arry[0].release_date;
    return Promise.all(movie);
  }

  componentDidMount() {
    const urlFilms = 'https://swapi.co/api/films';
    fetch(urlFilms)
      .then(response => response.json())
      .then(results => this.fetchMovieCrawl(results.results))
      .then(opening => this.setState({opening}))
      .catch(err => console.log(err))
  }

  //Methods for fetching people data

  displayPeople = e => {
    let buttonClicked = e.target.value;
    this.setState({buttonValue: buttonClicked})
    this.setState({movieCrawl: false})
    this.setState({opening: ''})
    const url = 'https://swapi.co/api/people';
    return fetch(url)
      .then(response => response.json())
      .then(results => this.fetchSpecies(results.results))
      .then(results => this.fetchHomeworld(results))
      .then(finalresults => this.setState({people: finalresults}))
      .catch(err => console.log(err)) 
  }

  fetchSpecies = data => {
    const species = data.map(person => {
      return fetch(person.species)
        .then(response => response.json())
        .then(result => {
          const newPerson = { ...person, species: result.name };
          return newPerson;
        });
    });
    return Promise.all(species);
  };

  fetchHomeworld = data => {
    const homeworld = data.map(person => {
      return fetch(person.homeworld)
        .then(response => response.json())
        .then(result => {
          const finalPerson = {
            ...person,
            homeworld: result.name,
            population: result.population
          };
          return finalPerson;
        });
    });
    return Promise.all(homeworld);
  };

  //Methods for fetching planets data

  displayPlanets = e => {
    let buttonClicked = e.target.value;
    this.setState({buttonValue: buttonClicked})
    this.setState({movieCrawl: false})
    this.setState({opening: ''})
    const url = "https://swapi.co/api/planets";
    return fetch(url)
      .then(response => response.json())
      .then(results => this.fetchResidentsOfPlanets(results.results))
      .then(data => this.setState({planets: data}))
      .catch(err => console.log(err))
  };
  
  fetchResidentsOfPlanets = planets => {
    const mapPlanets = planets.map(planet => {
      return this.mapResidents(planet).then(residentData => ({
        ...planet,
        residents: residentData
      }));
    });
    return Promise.all(mapPlanets);
  };
  
  mapResidents = planet => {
    const residentList = planet.residents.map(resident => {
      return this.fetchResidents(resident);
    });
    return Promise.all(residentList);
  };
  
  fetchResidents = resident => {
    return fetch(resident).then(response => response.json());
  };


  //Methods for fetching vehicles data

  displayVehicles = e => {
    let buttonClicked = e.target.value;
    this.setState({buttonValue: buttonClicked})
    this.setState({movieCrawl: false})
    this.setState({opening: ''})
    const url = 'https://swapi.co/api/vehicles';
    return fetch(url)
      .then(response => response.json())
      .then(results => this.setState({vehicles: results.results}))
      .catch(err => console.log(err)) 
  }


  render() {
    let welcomeHome =  <WelcomeHome openingCrawl={this.state.opening}
    displayPeople={this.displayPeople}
    displayPlanets={this.displayPlanets}
    displayVehicles={this.displayVehicles}
    />
    if (this.state.movieCrawl) {
    return (
      <div className="App">
      {welcomeHome}
      </div>             
                  );
    } else if (this.state.buttonValue === 'people') {
     return ( 
      <div>
      {welcomeHome}
      <People people={this.state.people}
             toggleFavorite={this.toggleFavorite}
      />
     </div>
     );
    } else if (this.state.buttonValue === 'planets') {
      return ( 
      <div>
      {welcomeHome}
      <Planets planets={this.state.planets}/>
      </div>
      );
    } else if (this.state.buttonValue === 'vehicles') {
      return ( 
      <div>
      {welcomeHome}
      <Vehicles vehicles={this.state.vehicles}/>
      </div>
       );
    }
  }
}

export default App;
