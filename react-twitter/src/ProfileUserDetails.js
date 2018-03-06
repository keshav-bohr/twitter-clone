import React, {Component} from 'react'
import FollowUser from './FollowUser';
import UnfollowUser from './UnfollowUser';
import BlockUser from './BlockUser'
import UnblockUser from './UnblockUser'


class ProfileUserDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            followRequest : false,
            unfollowRequest : false,
            blockRequest : false,
            unblockRequest : false
        }
        this.followButton = this.followButton.bind(this)
        this.followUser = this.followUser.bind(this)
        this.unfollowUser = this.unfollowUser.bind(this)
        this.blockButton = this.blockButton.bind(this)
        this.blockUser = this.blockUser.bind(this)
        this.unblockUser = this.unblockUser.bind(this)
    }




    followButton(){
        if(!this.props.profileData.same && this.props.profileData.isFollowing){
            return <div>
                    <button className = "list-group-item btn" onClick ={this.unfollowUser}>Following</button>
                    {this.state.unfollowRequest ? <UnfollowUser refreshUser = {this.props.refreshUser} username = {this.props.profileData.userDetails.username} /> : null}
                </div>
        }
        else{
            if(!this.props.profileData.same && !this.props.profileData.isFollowing){
                return <div>
                        <button className = "list-group-item btn" onClick = {this.followUser} >Follow</button>
                        {this.state.followRequest ? <FollowUser refreshUser = {this.props.refreshUser} username = {this.props.profileData.userDetails.username} /> : null}
                    </div>
            }
        }
    }


    blockButton(){
        if(!this.props.profileData.same && !this.props.profileData.isBlocked){
            return <div>
                    <button className = "list-group-item btn" onClick ={this.blockUser}>Block</button>
                    {this.state.blockRequest ? <BlockUser refreshUser = {this.props.refreshUser} username = {this.props.profileData.userDetails.username} /> : null}
                </div>
        }
        else{
            if(!this.props.profileData.same && this.props.profileData.isBlocked){
                return <div>
                    <button className = "list-group-item btn" onClick ={this.unblockUser}>Unblock</button>
                    {this.state.unblockRequest ? <UnblockUser refreshUser = {this.props.refreshUser} username = {this.props.profileData.userDetails.username} /> : null}
                </div>
            }
        }
    }


    blockUser(){
        this.setState({
            blockRequest : true,
            unblockRequest : false
        })
    }


    unblockUser(){
        this.setState({
            unblockRequest : true,
            blockRequest : false 
        })
    }


    followUser(){
        this.setState({
            followRequest : true,
            unfollowRequest : false
        })
    }


    unfollowUser(){
        this.setState({
            followRequest : false,
            unfollowRequest : true
        })
    }



    render(){
        return(
            <div id = "profileUserDetails" >
                <ul className="list-group">
                    <h3 className="list-group-item list-group-item-dark">{this.props.profileData.userDetails.name}</h3>
                    <h4 className = "list-group-item list-group-item-info">@{this.props.profileData.userDetails.username}</h4>
                    {this.blockButton()}
                    {!this.props.profileData.isBlocked ? this.followButton() : null}
                </ul>
            </div>
        )
    }
}


export default ProfileUserDetails