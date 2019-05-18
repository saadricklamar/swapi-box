import React from 'react';
import './Starships.css';

const Starships = (props) => {
  const cardInfo = props.starships.map(card => {
    let filmName = card.title;
      return  <article className='starships'>
                {/* <img src={require(`../images/${filmName}.jpeg`)}/> */}
                <h2 className='name'>{card.name}</h2>
                <h2>Crew: {card.crew}</h2>
                <h2>Passengers: {card.passengers}</h2>
                <h2>Starship Class: {card.starship_class}</h2>
            </article>
  })
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
  
    );
  
}

export default Starships;