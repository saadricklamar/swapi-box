import React, { Component } from 'react';
import './App.css';
import WelcomeHome from './WelcomeHome.js';
import Cards from './Cards.js';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opening: '',
      cards: [],
      movieCrawl: true,
      buttonValue: ''
      
    }
  }

  fetchMovieCrawl = (arry) => {
    let movie = arry[0].opening_crawl;
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

  // displayCards = (e) => {
  //   let value = e.target.value
  //   const url = `https://swapi.co/api/${value}`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(results => this.setState({cards: results.results}))
  //     .catch(err => console.log(err)) 
  // }


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
      .then(finalresults => this.setState({cards: finalresults}))
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

  render() {
    let page;
    if (this.state.movieCrawl) {
    return (
    <div className="App">
    <WelcomeHome openingCrawl={this.state.opening}
                  display={this.displayPeople}
                  />
    </div>             
                  );
    } else {
     return ( 
      <div>
      <WelcomeHome openingCrawl={this.state.opening}
      display={this.displayPeople}
      />
     <Cards cardsArray={this.state.cards}/>
     </div>
     );
    }
  }
}

export default App;
