import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      dataLoaded: false,
      comment: null,
      name: '',
      comment_text: '',
      fireRedirect: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios({
      method: 'GET',
      url: `/api/comments/${this.props.match.params.id}`
    })
    .then(data => {
      const comment = data.data;
      this.setState({
        dataLoaded: true,
        comment: comment,
        name: comment.name,
        comment_text: comment.comment_text,
      })
    })
    .catch(err => {
      console.log("Edit mounting error", err);
    })
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'PUT',
      url: `/api/comments/${this.props.match.params.id}`,
      data: {
        name: this.state.name,
        comment_text: this.state.comment_text,
      }
    })
    .then(comment => {
      this.setState({
        fireRedirect: true,
      })
    })
    .catch(err => {
      console.log("Update error", err);
    })
  }
  renderEdit() {
    if (this.state.dataLoaded) {
      return(
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
            required
          />
          <br />
          <input type="submit" value="Update Comment!" />
        </form>
      )
    }
    else {
      return(
        <h3>Loading data...</h3>
      )
    }
  }
  render() {
    return(
      <div className="Edit">
        {this.renderEdit()}
        {this.state.fireRedirect ? <Redirect to={`/post/${this.state.comment.post_id}`} /> : ''}
      </div>
    )
  }
}

export default Edit;
