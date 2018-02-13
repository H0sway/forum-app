import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Enter from './components/Enter';
import TopicList from './components/TopicList';
// import Posts from './components/Posts';
// import Post from './components/Post';

class App extends Component {
  render() {
    return(
      <Router>
        <div className="App">
        <Header />
        <Route exact path="/" component={Enter} />
        <Route exact path="/topics" component={TopicList} />
               {/* <Route exact path="/:topic" component={Posts} />
                <Route exact path="/post" component={Post} /> */}
        <Footer />
        </div>
      </Router>
      )
  }
}

export default App;
