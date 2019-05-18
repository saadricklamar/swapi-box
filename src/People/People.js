import React from 'react';
import './People.css';

const People = (props) => {
  const cardInfo = props.people.map(card => {
    let personName = card.name;
    return <article className='card'>
                <img src={require(`../images/${personName}.jpeg`)}/>
                <i className='fas fa-star'></i> 
                <div className='dark-background'>
                  <h2 className='name'>{card.name}</h2>
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