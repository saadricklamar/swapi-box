import React from 'react';
import './Vehicles.css';


const Vehicles = (props) => {
  const cardInfo = props.vehicles.map(card => {
    let vehicleName = card.name;
      return  <article className='vehicles'>
                <img src={require(`../images/${vehicleName}.jpeg`)}/>
                <h2>{card.name}</h2>
                <h2>Model: {card.model}</h2>
                <h2>Class: {card.vehicle_class}</h2>
                <h2>Passengers: {card.passengers}</h2>
                <i class="far fa-star"></i>
            </article>
  })
    return (
    <div className='cardsContainer'>
     {cardInfo}
    </div>
  
    );
  
}

export default Vehicles;