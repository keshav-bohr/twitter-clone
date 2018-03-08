import React, {Component} from 'react'
import TweetsOfFollowing from './TweetsOfFollowing'
import CreateTweets from './CreateTweets';
import SearchUser from './SearchUser';
import UserProfile from './UserProfile';
import Suggestions from './Suggestions';
import UserHomepageHeader from './UserHomepageHeader';
import Trendings from './Trending';
import SingleTrend from './SingleTrend';

class UserHomepage extends Component{
    constructor(props){
        super(props)
        this.state = {
            message : '',
            homepage: true,
            profile: false,
            singleTrend : false,
            hashtag : '',
            userProfile: '',
            currentUsername : '',
            toggleSearchFlag: true
        }
        this.showUserHomepage = this.showUserHomepage.bind(this);
        this.setMessage = this.setMessage.bind(this)
        this.setUserProfile = this.setUserProfile.bind(this)
        this.displayMessage = this.displayMessage.bind(this)
        this.setHomepage = this.setHomepage.bind(this)
        this.setSingleTrend = this.setSingleTrend.bind(this)
        this.setToggleSearchFlag = this.setToggleSearchFlag.bind(this)
        this.setCurrentUsername = this.setCurrentUsername.bind(this)
        // this.logoutUser = this.logoutUser.bind(this)
    }

    setMessage(messageFromChild){
        this.setState({
            message : messageFromChild
        })
    }

    setToggleSearchFlag(){
        this.setState({
            toggleSearchFlag : !this.state.toggleSearchFlag
        })
    }

    setCurrentUsername(currentUsername){
        this.setState({
            currentUsername : currentUsername
        })
    }


    showUserHomepage(){
        return <div>
                    {<CreateTweets setMessage = {this.setMessage}/>}
                    {<TweetsOfFollowing setUserProfile = {this.setUserProfile}/> }
                    {<Suggestions setUserProfile = {this.setUserProfile} />}
                    {<Trendings message = {this.state.message} setSingleTrend = {this.setSingleTrend}/>}
                </div>
    }


    setUserProfile(userProfile){
        if(userProfile){
            this.setState({
                userProfile : userProfile,
                profile : true ,
                homepage: false,
                singleTrend : false
            })
        }
        if(userProfile === this.state.currentUsername){
            this.setToggleSearchFlag()
        }
    }

    setSingleTrend(hashtag){
        this.setState({
            singleTrend : true,
            homepage : false,
            hashtag : hashtag
        })
    }

    setHomepage(){
        this.setState({
            homepage : true,
            profile : false,
            singleTrend : false
        })
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
                <UserHomepageHeader setCurrentUsername = {this.setCurrentUsername} setHomepage = {this.setHomepage} setUserProfile = {this.setUserProfile} setToggleSearchFlag = {this.setToggleSearchFlag} />
                <div className = "alert alert-success" id = "successMessage" role="alert">
                    {this.displayMessage()||<br />}
                </div>
                <div className = "header">
                    {<SearchUser userProfile = {this.setUserProfile}/>}
                </div>
                {this.state.homepage ? this.showUserHomepage() :null}
                {this.state.profile ? <UserProfile username = {this.state.userProfile} toggleSearchFlag = {this.state.toggleSearchFlag}/> : null}
                {this.state.singleTrend ? <SingleTrend setUserProfile = {this.setUserProfile} hashtag = {this.state.hashtag} /> : null}
            </div>
        )
    }
}

export default UserHomepage