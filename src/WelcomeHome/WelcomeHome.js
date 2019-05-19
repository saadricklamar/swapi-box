import React, { Component } from 'react';
import logo from '../logo.svg';
import './WelcomeHome.css';

const WelcomeHome = (props) => {
    return (
    <div className="App">
     <section className='container'>
      <section className='sidebar'>
         <h1>SWAPIBox</h1>
         <i class="fab fa-galactic-senate"></i>
         <button value='people' onClick={props.displayPeople} class='active'>People</button>
         <button value='planets' onClick={props.displayPlanets}>Planets</button>
         <button value='vehicles' onClick={props.displayVehicles}>Vehicles</button>
         <button value='films' onClick={props.displayFilms}>Films</button>
         <button value='species' onClick={props.displaySpecies}>Species</button>
         <button value='starships' onClick={props.displayStarships}>Starships</button>
         <img src={logo} className="App-logo" alt="logo" />
      </section>
      <section>
        <header>
          <div className='scroll-right'>
            <button onClick={props.displayFavorites}>View <span>{props.favoriteCounter}</span> Favorites </button>
          </div>
        </header>
        <main className='scroll-up'>
          <p>{props.openingCrawl}</p>
        </main>
      </section>
     </section>
    </div>
    );
}

export default WelcomeHome;