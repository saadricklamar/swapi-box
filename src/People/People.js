import React from 'react';
import './People.css';

const People = (props) => {
  const cleanCard = props.people.map(card => {
    return ({
      title: card.name,
      species: card.species,
      homeworld: card.homeworld,
      population: card.population,
      id: card.height
    })})
  const cardInfo = cleanCard.map(card => {
    let personName = card.title;
    return <article className='card' key={card.id}>
                <img src={require(`../images/${personName}.jpeg`)}/>
                <i className='fas fa-star' onClick={() => props.toggleFavorite(card)}></i> 
                <div className='dark-background'>
                  <h2 className='name'>{card.title}</h2>
                  <h2>Species: {card.species}</h2>
                  <h2>Homeworld: {card.homeworld}</h2>
                  <h2>Population: {card.population}</h2>
                </div>
            </article>
  });
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
    );
}

export default People;