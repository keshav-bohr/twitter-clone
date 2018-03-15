import React, {Component} from 'react'
import Register from './Register'
import Login from './Login'
import kwitterBird from './twitter-clone-CSS/Kwitter-bird.png'

import UserHomepage from './UserHomepage'

class Homepage extends Component{
    constructor(props){
        super(props)
        this.state = {
            loggedIn : false
        }
        this.checkLoginStatus = this.checkLoginStatus.bind(this)
        this.showHomepage = this.showHomepage.bind(this)
    }

    checkLoginStatus(loggedInStatus){
        this.setState({
            loggedIn : loggedInStatus
        })
    }

    showHomepage(){
        return <div>
                    <img src = {kwitterBird} className = "kwitterBird" alt = "Bird"/>
                    <div className = "Homepage">
                        <Login checkLoginStatus = {this.checkLoginStatus} errorMessage = {this.setError}/>
                        <br /><br />
                        <h1>Welcome to Kwitter</h1>
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <h3>See what's happening in the WAL right now</h3><br />
                        <h5>Join Kwitter today</h5>
                        <Register errorMessage = {this.setError}/>
                    </div>
                </div> 
    }


    render(){
        return(
            <div>
                {!this.state.loggedIn? this.showHomepage(): <UserHomepage /> }
            </div>
        )
    }
}


export default Homepage