import React, { Component } from 'react';
// import logo from './logo.svg';
import './twitter-clone-CSS/App.css';
import Homepage from './Homepage'
import cookie from 'react-cookies'
import UserHomepage from './UserHomepage';
// import UserProfile from './UserProfile'
// import {BrowserRouter as Route, Router} from 'react-router-dom'
// import SearchUser from './SearchUser';



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      token : cookie.load('token')
    }
    this.checkTheCookie = this.checkTheCookie.bind(this)
  }
  
  checkTheCookie(){
    if(this.state.token){
      return <UserHomepage />
    }
    else{
      return <Homepage />
    }
  }
  
  render() {
    return(
      <div>
        {/* <Switch>
          <Route exact path = '/' component = {UserHomepage} />
          <Route path = '/profile' component = {UserProfile} />
        </Switch> */}
      {/* <Router>
        <div>
          <Route exact path ="/" component = {UserHomepage}/>
          <Route path = "/profile:username" component = {SearchUser} />
        </div>
      </Router> */}
        {this.checkTheCookie()}
      </div>
    )
  }
}

export default App;
