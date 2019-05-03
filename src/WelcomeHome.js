import React, { Component } from 'react';
import './WelcomeHome.css';


class WelcomeHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
   
    }
  }

  render() {
    return (
    <div className="App">
     <section className='container'>
      <section className='sidebar'>
         <h1>SWAPIBox</h1>
         <button value='people' onClick={this.props.display}>People</button>
         <button value='planets' onClick={this.props.display}>Planets</button>
         <button value='vehicles' onClick={this.props.display}>Vehicles</button>
         <button>Films</button>
         <button>Species</button>
         <button>Starships</button>
      </section>
      <section>
        <header>
          
        </header>
        <main className='scroll-up'>
          <p>{this.props.openingCrawl}</p>
        </main>
      </section>
     </section>
    </div>
    );
  }
}

export default WelcomeHome;