import React, { Component } from 'react';
import './App.css';
import WelcomeHome from '../WelcomeHome/WelcomeHome';
import People from '../People/People';
import Planets from '../Planets/Planets';


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

  fetchMovieCrawl = (arry) => {
    let movie = arry[0].opening_crawl + '\n' + arry[0].title + '\n' + arry[0].release_date;
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

  displayPeople = (e) => {
    let buttonClicked = e.target.value;
    this.setState({buttonValue: buttonClicked})
    this.setState({movieCrawl: false})
    this.setState({opening: ''})
    const url = 'https://swapi.co/api/people';
    fetch(url)
      .then(response => response.json())
      .then(results => this.fetchSpecies(results.results))
      .then(results => this.fetchHomeworld(results))
      .then(finalresults => this.setState({people: finalresults}))
      .catch(err => console.log(err)) 
  }

  fetchSpecies = (data) => {
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

  fetchHomeworld = (data) => {
    const homeworld = data.map(person => {
      return fetch(person.homeworld)
        .then(response => response.json())
        .then(result => {
          const finishedPerson = {
            ...person,
            homeworld: result.name,
            population: result.population
          };
          return finishedPerson;
        });
    });
    return Promise.all(homeworld);
  };

  // displayPlanets = (e) => {
  //   let buttonClicked = e.target.value;
  //   this.setState({buttonValue: buttonClicked})
  //   this.setState({movieCrawl: false})
  //   this.setState({opening: ''})
  //   const url = 'https://swapi.co/api/planets';
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(results => this.fetchResidents(results.results))
  //     .then(data => this.setState({planets: data}))
  //     .catch(err => console.log(err)) 
  // }

  // fetchResidents = (data) => {
  //   console.log(data)
  //   const inhabitants = data.map(planet => {
  //     return fetch(planet.residents)
  //       .then(response => response.json())
  //       .then(result => {
  //         const newPlanet = { ...planet, residents: result.name};
  //         return newPlanet;
  //       });
  //   });
  //   return Promise.all(inhabitants);
  // };

  displayPlanets = (e) => {
    let buttonClicked = e.target.value;
    this.setState({buttonValue: buttonClicked})
    this.setState({movieCrawl: false})
    this.setState({opening: ''})
    const url = "https://swapi.co/api/planets/";
    return fetch(url)
      .then(response => response.json())
      .then(results => this.fetchResidentsInPlanets(results.results))
      .then(data => this.setState({planets: data}))
      .catch(err => console.log(err))
  };
  
  fetchResidentsInPlanets = planets => {
    const mapPlanets = planets.map(planet => {
      return this.mapResidents(planet).then(residentData => ({
        ...planet,
        residents: residentData
      }));
    });
    return Promise.all(mapPlanets);
  };
  
  mapResidents = planet => {
    const residentArray = planet.residents.map(resident => {
      return this.fetchResidents(resident);
    });
    return Promise.all(residentArray);
  };
  
  fetchResidents = resident => {
    return fetch(resident).then(response => response.json());
  };



  render() {
    console.log(this.state.planets)
    let page;
    if (this.state.movieCrawl) {
    return (
    <div className="App">
    <WelcomeHome openingCrawl={this.state.opening}
                  displayPeople={this.displayPeople}
                  displayPlanets={this.displayPlanets}
                  />
    </div>             
                  );
    } else if (this.state.buttonValue === 'people') {
     return ( 
      <div>
      <WelcomeHome openingCrawl={this.state.opening}
      displayPeople={this.displayPeople}
      displayPlanets={this.displayPlanets}
      />
     <People people={this.state.people}/>
     </div>
     );
    } else if (this.state.buttonValue === 'planets') {
      return ( 
       <div>
       <WelcomeHome openingCrawl={this.state.opening}
       displayPeople={this.displayPeople}
       displayPlanets={this.displayPlanets}
       />
      <Planets planets={this.state.planets}/>
      </div>
      );
      }
  }
}

export default App;
