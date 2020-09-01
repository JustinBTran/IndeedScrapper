import React, { Component } from 'react';

export default class Button extends Component {
    constructor() {
        super();
        this.getRequest = this.getRequest.bind(this);
    }
  getRequest = () => {
    console.log('yaaeh');
  }
  render() {
      console.log("bruh");
    return (
        <button onClick = {this.getRequest}> Submit</button>
    )
  }
}