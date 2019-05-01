import React, { Component } from 'react';
import './App.css';
import WelcomeHome from './WelcomeHome.js';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opening: ''
    }
  }

  fetchMovieCrawl = (arry) => {
    let movie = arry[0].opening_crawl;
    return Promise.all(movie);
  }

  componentDidMount() {
    const url = 'https://swapi.co/api/films';
    fetch(url)
      .then(response => response.json())
      .then(results => this.fetchMovieCrawl(results.results))
      .then(opening => this.setState({opening}))
      .catch(err => console.log(err))
  }


  render() {
    return (
    <div className="App">
     <WelcomeHome openingCrawl={this.state.opening}/>
    </div>
    );
  }
}

export default App;
