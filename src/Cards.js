import React, { Component } from 'react';
import './Cards.css';


const Cards = (props) => {
  const cardInfo = props.cardsArray.map(card => {
      return  <article className='cards'>
                <h2>{card.name}</h2>
                <h2>Species: {card.species}</h2>
                <h2>Homeworld: {card.homeworld}</h2>
                <h2>Population: {card.population}</h2>
            </article>
  })
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
  
    );
  
}

export default Cards;