import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

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
    axios.get('/api/posts')
    .then(data => {
      console.log(data.data.length);
      if (data.data.length) {
        const posts = data.data.filter(post => post.topic_id == this.props.match.params.id)
        if (posts.length) {
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
          <div className="single-post" key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></div>
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
      <div className="new-post">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.postTitle}
            name="postTitle"
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
    axios.post('/api/posts', {
      post: {
        title: this.state.postTitle,
        topic_id: this.props.match.params.id,
      }
    })
    .then(post => {
      this.setState({
        redirectUrl: `/post/${post.data.id}`,
        fireRedirect: true,
      })
    })
    .catch(err => {
      console.log("Create a new post error", err);
    })
  }
  render() {
    return(
      <div className="Posts">
        {this.newPost()}
        {this.renderPosts()}
        {this.state.fireRedirect ? <Redirect to={this.state.redirectUrl} /> : ''}
        <div><Link to="/topics">Back to Topics</Link></div>
      </div>
    )
  }
}

export default Posts;
