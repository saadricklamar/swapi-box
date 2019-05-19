import React from 'react';
import './Vehicles.css';


const Vehicles = (props) => {
  const cleanCard = props.vehicles.map(card => {
    return ({
      title: card.name,
      model: card.model,
      class: card.vehicle_class,
      passengers: card.passengers,
      id: card.length
    })})

  const cardInfo = cleanCard.map(card => {
    let vehicleName = card.title;
      return  <article className='card' key={card.id}>
                <img src={require(`../images/${vehicleName}.jpeg`)}/>
                <i className='fas fa-star' onClick={() => props.toggleFavorite(card)}></i> 
                <div className='dark-background'>
                  <h2 className='name'>{card.title}</h2>
                  <h2>Model: {card.model}</h2>
                  <h2>Class: {card.class}</h2>
                  <h2>Passengers: {card.passengers}</h2>
                </div>
            </article>
  })
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
  
    );
  
}

export default Vehicles;