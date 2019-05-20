import React from 'react';
import './Species.css';

const Species = (props) => {
  const cardInfo = props.species.map(card => {
    let filmName = card.name;
      return  <article className='card'>
                <img src={require(`../images/${filmName}.jpeg`)}/>
                <i className='fas fa-star'></i> 
                <div className='dark-background'>
                  <h2 className='name'>{card.name}</h2>
                  <h2>Classification: {card.classification}</h2>
                  <h2>Average Height: {card.average_height}</h2>
                  <h2>Language: {card.language}</h2>
                </div>
            </article>
  })
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
  
    );
  
}

export default Species;