import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      dataLoaded: false,
      posts: [],
      postTitle: "",
      fireRedirect: false,
      redirectUrl: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch({
      method: 'GET',
      url: '/api/posts'
    })
    .then(res => res.json())
    .then(data => {
      if (data.count) {
        const posts = data.filter(post => post.topic_id)
        if (posts.count) {
          this.setState({
            dataLoaded: true,
            posts: posts,
          })
        }
      }
    })
    .catch(err => {
      console.log('Inside posts error', err);
    })
    console.log(this.state.posts);
  }
  renderPosts() {
    if (this.state.dataLoaded) {
      return this.state.posts.map(post => {
        return (
          <div className="Post" key={post.id}><p>{post.title}</p></div>
        )
      })
    }
    else {
      return(
        <div>
          <h3>It doesn't appear there's anything here. Perhaps you'd like to make a post?</h3>
        </div>
      )
    }
  }
  newPost() {
    return(
      <div className="New Post">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.postTitle}
            onChange={this.handleChange}
            placeholder="Post Title Goes Here"
            required
          />
          <br />
          <input type="submit" value="New Post!" />
        </form>
      </div>
    )
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault()
    fetch({
      method: 'POST',
      url: '/api/posts'
    })
    .then(res => res.json())
    .then(post => {
      this.setState({
        fireRedirect: true,
        redirectUrl: `/post/:id`,
      })
    })
  }
  render() {
    return(
      <div className="Posts">
        {this.newPost()}
        {this.renderPosts()}
        {this.state.fireRedirect ? <Redirect to={this.state.redirectUrl} /> : ''}
      </div>
    )
  }
}

export default Posts;
