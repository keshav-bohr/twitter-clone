import React, { Component } from 'react';
// import logo from './logo.svg';
import './twitter-clone-CSS/App.css';
import Homepage from './Homepage'
import cookie from 'react-cookies'
import UserHomepage from './UserHomepage';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      token : cookie.load('token')
    }
    // this.checkTheCookie = this.checkTheCookie.bind(this)
  }

  render() {
    if(this.state.token){
      return <UserHomepage />
    }
    else{
      return <Homepage />
    }
  }
}

export default App;
