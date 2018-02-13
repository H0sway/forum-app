import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'

class App extends Component {
  render() {
    return(
      <Router>
        <div className="App">
        <Header />
        <Footer />
        </div>
      </Router>
      )
  }
}

export default App;
