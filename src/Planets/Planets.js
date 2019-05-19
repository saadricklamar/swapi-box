import React from 'react';
import './Planets.css';

const Planets = (props) => {
  const cleanCard = props.planets.map(card => {
    return ({
      title: card.name,
      terrain: card.terrain,
      population: card.population,
      climate: card.climate,
      residents: card.residents,
      id: card.diameter
    })})

  const cardInfo = cleanCard.map(card => {
    let planetName = card.title;
      return  <article className='card' key={card.id}>
                 <img src={require(`../images/${planetName}.jpeg`)}/>
                 <i className='fas fa-star' onClick={() => props.toggleFavorite(card)}></i> 
                 <div className='dark-background'>
                  <h2 className='name'>{card.title}</h2>
                  <h2 className='terrain'>Terrain: {card.terrain}</h2>
                  <h2 className='population'>Population: {card.population}</h2>
                  <h2 className='climate'>Climate: {card.climate}</h2>
                  <h2>Residents: {card.residents.map(resident => {
                    if(card.residents.length === 1) {
                        return resident.name
                    } else {
                        return resident.name + ', ';
                    }
                    })}
                  </h2>
                </div>
            </article>
  })
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
  
    );
  
}

export default Planets;