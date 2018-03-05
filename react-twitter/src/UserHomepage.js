import React, {Component} from 'react'
// import axios from 'axios'
import TweetsOfFollowing from './TweetsOfFollowing'
import CreateTweets from './CreateTweets';
import SearchUser from './SearchUser';
import UserProfile from './UserProfile';

class UserHomepage extends Component{
    constructor(props){
        super(props)
        this.state = {
            message : '',
            homepage: true,
            profile: false,
            trend : false,
            userProfile: ''
        }
        this.showUserHomepage = this.showUserHomepage.bind(this);
        this.setMessage = this.setMessage.bind(this)
        this.setUserProfile = this.setUserProfile.bind(this)
        this.displayMessage = this.displayMessage.bind(this)
    }

    setMessage(messageFromChild){
        this.setState({
            message : messageFromChild
        })
    }

    showUserHomepage(){
        return <div>
                    {<CreateTweets setMessage = {this.setMessage}/>}
                    {<TweetsOfFollowing setMessage = {this.setMessage}/> }
                </div>
    }


    setUserProfile(userProfile){
        if(userProfile){
            this.setState({
                userProfile : userProfile,
                profile : true ,
                homepage: false
            })
        }
    }


    displayMessage(){
        setTimeout(() => {
            this.setState({
                message : ''
            })
        }, 10000);
        return this.state.message
    }

    render(){
        return (
            <div>
                <div className = "alert alert-success" id = "successMessage" role="alert">
                    {this.displayMessage()||<br />}
                </div>
                <div className = "header">
                    {<SearchUser userProfile = {this.setUserProfile}/>}
                </div>
                {this.state.homepage ? this.showUserHomepage() :null}
                {this.state.profile ? <UserProfile username = {this.state.userProfile} /> : null}
            </div>
        )
    }
}

export default UserHomepage