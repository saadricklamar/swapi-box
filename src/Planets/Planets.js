import React from 'react';
import './Planets.css';

const Planets = (props) => {
  const cardInfo = props.planets.map(card => {
    let planetName = card.name;
      return  <article className='card'>
                 <img src={require(`../images/${planetName}.jpeg`)}/>
                 <i className='fas fa-star'></i> 
                 <div className='dark-background'>
                  <h2 className='name'>{card.name}</h2>
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