import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      dataLoaded: false,
      comments: [],
      topic_id: null,
      name: '',
      comment_text: '',
      fireRedirect: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.all([
      axios.get('/api/comments'),
      axios.get(`/api/posts/${this.props.match.params.id}`)
      ])
    .then(axios.spread((comments, posts) => {
      console.log("Harambe", comments, posts);
      this.setState({
        topic_id: posts.data.topic_id
      })
      if (posts.data.count) {
        const array = data.data.filter(comment => comment.post_id == this.props.match.params.id);
        if (array.length) {
          this.setState({
            dataLoaded: true,
            comments: array,
          })
        }
      }
    }))
    .catch(err => {
      console.log("Post data error", err);
    })
  }
  renderComments() {
    if (this.state.dataLoaded) {
      return this.state.comments.map(comment => {
        <div className="comment">
          <h4>{comment.name}</h4>
          <article>{comment.comment_text}</article>
          <button onClick={this.editComment}>Edit</button>
        </div>
      })
    }
    else {
      return(
        <p>Nobody's commented yet. Why not be the first?</p>
      )
    }
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
    axios({
      method: 'POST',
      url: '/api/comments',
      data: {
        name: this.state.name,
        comment_text: this.state.comment_text,
        post_id: this.props.match.params.id
      }
    })
    .then(comment => {
      this.setState({
        fireRedirect: true,
      })
    })
    .catch(err => {
      console.log("Create a new comment error", err);
    })
  }
  newComment() {
    return(
      <div className="new-comment">
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            required
          />
          <br />
          <label>Comment</label>
          <br />
          <textarea
            value={this.state.comment_text}
            name="comment_text"
            onChange={this.handleChange}
            placeholder="Write out your comment here."
            required
          />
          <br />
          <input type="submit" value="New Comment!" />
        </form>
      </div>
    )
  }
  render() {
    return(
      <div className="Post">
        <button><Link to={`/topics/${this.state.topic_id}`}>Go Back</Link></button>
        {this.renderComments()}
        {this.newComment()}
        {this.state.fireRedirect ? <Redirect to={`/post/${this.props.match.params.id}`} /> : ''}
      </div>
    )
  }
}

export default Post;
