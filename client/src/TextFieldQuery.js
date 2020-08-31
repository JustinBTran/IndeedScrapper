import React, { Component } from 'react';
import './TextFieldQuery.css';

export default class QueryTextInput extends Component {
  render() {
    return (
      <div className="field">
          <input
          type="text"
          placeholder = "Search Inquiry, eg. 'Software Internship remote'"
          style = {{width:280}}
        />
        <input
          type="text"
          placeholder = "Location (Optional)"
          style = {{width:200}}
        />
      </div>
    )
  }
}