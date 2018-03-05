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
        if (prevProps.username !== this.props.username || prevState.toggleFlag !== this.state.toggleFlag) {
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
                        <ProfileUserDetails userDetails = {this.state.profileData.userDetails} same = {this.state.profileData.same} isFollowing = {this.state.profileData.isFollowing} refreshUser = {this.refreshUserProfile}/> 
                        <ProfileFollowDetails followDetails = {this.state.profileData.followDetails} refreshUser = {this.refreshUserProfile}/>
                    </div> : null}
            </div>
        )
    }
}

export default UserProfile