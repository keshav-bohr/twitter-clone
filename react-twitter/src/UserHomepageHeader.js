import React, {Component} from 'react'
import GetCurrentUsername from './GetCurrentUsername'
import Logout from './Logout';


class UserHomepageHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentUsername : '',
            currentUser : ''
        }
        this.setCurrentUsername = this.setCurrentUsername.bind(this);
        this.setUserProfile = this.setUserProfile.bind(this)
        this.setCurrentUser = this.setCurrentUser.bind(this)
    }

    setCurrentUser(currentUser){
        this.setState({
            currentUser : currentUser
        })
    }

    setCurrentUsername(currentUsername){
        this.setState({
            currentUsername : currentUsername
        })
        this.props.setCurrentUsername(currentUsername)
    }

    setUserProfile(){
        this.props.setUserProfile(this.state.currentUsername)
        this.props.setToggleSearchFlag();
    }

    render(){
        return(
            <div>
                <GetCurrentUsername currentUsername = {this.setCurrentUsername} currentUser = {this.setCurrentUser} />
                <button type = "button" id = "homeButton" className = "btn" onClick = {this.props.setHomepage}>Home</button>
                <button type = "button" id = "profileButton" className = "btn" onClick = {this.setUserProfile}>Profile</button>
                <Logout/>
                <h2 id = "nameOfUser">{this.state.currentUser}</h2>
            </div>
        )
    }
}


export default UserHomepageHeader