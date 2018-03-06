import React, {Component} from 'react'
import axios from 'axios'
import ProfileUserDetails from './ProfileUserDetails';
import ProfileFollowDetails from './ProfileFollowDetails';


class UserProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            profileData : {},
            searchUserFromDb : true,
            userFound : false,
            toggleFlag : false,
            username: this.props.username
        }
        this.getProfileDataFromDb = this.getProfileDataFromDb.bind(this);
        this.refreshUserProfile = this.refreshUserProfile.bind(this);
    }

    getProfileDataFromDb(){
        axios({
            method: 'post',
            url : "http://localhost:3001/user/profile",
            data: {
                username: this.state.username
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                profileData : res.data.profileData,
                searchUserFromDb : false,
                userFound : true
            })
        })
    }


    refreshUserProfile(username){
        this.setState({
            toggleFlag : !this.state.toggleFlag,
            username : username
        })
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.username !== this.props.username) {
          this.setState({
              searchUserFromDb : true,
              username : this.props.username,
          })
        }
        if (prevState.toggleFlag !== this.state.toggleFlag) {
            this.setState({
                searchUserFromDb : true
            })
          }
      }



    render(){
        return(
            <div>
                {this.state.searchUserFromDb ? this.getProfileDataFromDb() : null}
                {this.state.userFound ? <div> 
                        <ProfileUserDetails profileData = {this.state.profileData} refreshUser = {this.refreshUserProfile}/> 
                        {!this.state.profileData.isBlocked ? <ProfileFollowDetails followDetails = {this.state.profileData.followDetails} refreshUser = {this.refreshUserProfile}/> : null }
                    </div> : null}
            </div>
        )
    }
}

export default UserProfile