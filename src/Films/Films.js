import React from 'react';
import './Films.css';


const Films = (props) => {
  const cardInfo = props.films.map(card => {
    let filmName = card.title;
      return  <article className='films'>
                <img src={require(`../images/${filmName}.jpeg`)}/>
                <h2 className='name'>{card.title}</h2>
                <h2>Episode: {card.episode_id}</h2>
                <h2>Released: {card.release_date}</h2>
                <h2>Director: {card.director}</h2>
            </article>
  })
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
  
    );
  
}

export default Films;