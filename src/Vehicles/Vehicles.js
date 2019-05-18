import React from 'react';
import './Vehicles.css';


const Vehicles = (props) => {
  const cardInfo = props.vehicles.map(card => {
    let vehicleName = card.name;
      return  <article className='card'>
                <img src={require(`../images/${vehicleName}.jpeg`)}/>
                <i className='fas fa-star'></i> 
                <div className='dark-background'>
                  <h2 className='name'>{card.name}</h2>
                  <h2>Model: {card.model}</h2>
                  <h2>Class: {card.vehicle_class}</h2>
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