import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TopicList extends Component {
  constructor() {
    super()
    this.state = {
      dataLoaded: false,
      topics: [],
    }
  }
  componentDidMount() {
    axios.get('/api/topics')
    .then(topics => {
      console.log(topics);
      this.setState({
        dataLoaded: true,
        topics: topics.data,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  renderTopicsList() {
    return this.state.topics.map(topic => {
      return (
        <li key={topic.id}><Link to={`/topics/${topic.id}`}>{topic.title}</Link></li>
      )
    })
  }
  render() {
    return(
      <div className="TopicList">
        {this.state.dataLoaded ? this.renderTopicsList() : <div><h3>Loading Site...</h3></div>}
      </div>
      )
    }
  }

export default TopicList;
