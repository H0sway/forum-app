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
  }
  componentDidMount() {
    axios({
      method: 'GET',
      url: `/api/comments/${this.props.match.params.id}`
    })
    .then(data => {
      const comment = data.data;
      console.log(comment);
    })
    .catch(err => {
      console.log("Edit mounting error", err);
    })
  }
  render() {
    return(
      <div className="Edit">
      </div>
    )
  }
}

export default Edit;
