import React from 'react';
import './Planets.css';

const Planets = (props) => {
  const cardInfo = props.planets.map(card => {
    let planetName = card.name;
      return  <article className='planets'>
                <img src={require(`../images/${planetName}.jpeg`)}/>
                <h2 className='name'>{card.name}</h2>
                <h2>Terrain: {card.terrain}</h2>
                <h2>Population: {card.population}</h2>
                <h2>Climate: {card.climate}</h2>
                <h2>Residents: {card.residents.map(resident => {
                    if(card.residents.length === 1) {
                        return resident.name
                    } else {
                        return resident.name + ', ';
                    }
                })}
                </h2>
            </article>
  })
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
  
    );
  
}

export default Planets;