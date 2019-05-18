import React from 'react';
import './Films.css';


const Films = (props) => {
  const cleanCard = props.films.map(card => {
    return ({
      title: card.title,
      episode: card.episode_id,
      released: card.release_date,
      director: card.director,
      id: card.episode_id
    })})
    
   const cardInfo = cleanCard.map(card => {
    let filmName = card.title;
    return  <article className='card' key={card.id}>
              <img src={require(`../images/${filmName}.jpeg`)}/>
              <i className='fas fa-star'></i> 
              <div className='dark-background'>
                <h2 className='name'>{card.title}</h2>
                <h2>Episode: {card.episode}</h2>
                <h2>Released: {card.released}</h2>
                <h2>Director: {card.director}</h2>
              </div>
          </article>
   })
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
  
    );
  
}

export default Films;