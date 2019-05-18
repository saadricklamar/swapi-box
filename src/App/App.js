import React, { Component } from 'react';
import './App.css';
import WelcomeHome from '../WelcomeHome/WelcomeHome';
import People from '../People/People';
import Planets from '../Planets/Planets';
import Vehicles from '../Vehicles/Vehicles';
import Films from '../Films/Films';
import { fetchSpecies } from '../fetchCalls/fetchCalls';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opening: '',
      people: [],
      planets: [],
      vehicles: [],
      films: [],
      species: [],
      starships: [],
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

  // Method for fetching films data

  displayFilms = e => {
    let buttonClicked = e.target.value;
    this.setState({buttonValue: buttonClicked})
    this.setState({movieCrawl: false})
    this.setState({opening: ''})
    const urlFilms = 'https://swapi.co/api/films';
    fetch(urlFilms)
      .then(response => response.json())
      .then(results => this.setState({films: results.results}))
      .catch(err => console.log(err))
  }

  // Method for fetching species data

  displaySpecies = e => {
    let buttonClicked = e.target.value;
    this.setState({buttonValue: buttonClicked})
    this.setState({movieCrawl: false})
    this.setState({opening: ''})
    const urlSpecies = 'https://swapi.co/api/species';
    fetch(urlSpecies)
      .then(response => response.json())
      .then(results => this.setState({species: results.results}))
      .catch(err => console.log(err))
  }

   // Method for fetching starships data

   displayStarships = e => {
    let buttonClicked = e.target.value;
    this.setState({buttonValue: buttonClicked})
    this.setState({movieCrawl: false})
    this.setState({opening: ''})
    const urlSpecies = 'https://swapi.co/api/starships';
    fetch(urlSpecies)
      .then(response => response.json())
      .then(results => this.setState({starships: results.results}))
      .catch(err => console.log(err))
  }


  render() {
    console.log(this.state.starships)
    let welcomeHome =  <WelcomeHome openingCrawl={this.state.opening}
                                    displayPeople={this.displayPeople}
                                    displayPlanets={this.displayPlanets}
                                    displayVehicles={this.displayVehicles}
                                    displayFilms={this.displayFilms}
                                    displaySpecies={this.displaySpecies}
                                    displayStarships={this.displayStarships}
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
    } else if (this.state.buttonValue === 'films') {
      return ( 
      <div>
      {welcomeHome}
      <Films films={this.state.films}/>
      </div>
       );
    } else if (this.state.buttonValue === 'species') {
      return ( 
      <div>
      {welcomeHome}
      {/* <Films films={this.state.films}/> */}
      </div>
       );
    } else if (this.state.buttonValue === 'starships') {
      return ( 
      <div>
      {welcomeHome}
      {/* <Films films={this.state.films}/> */}
      </div>
       );
    }
  }
}

export default App;
