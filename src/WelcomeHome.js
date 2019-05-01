import React, { Component } from 'react';
import './WelcomeHome.css';


class WelcomeHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: []
    }
  }

  render() {
    return (
    <div className="App">
     <section className='container'>
      <section className='sidebar'>
         <button>People</button>
         <button>Planets</button>
         <button>Vehicles</button>
         <button>Films</button>
         <button>Species</button>
         <button>Starships</button>
      </section>
      <section>
        <header>
          <h1>SWAPIBox</h1>
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