import React, {Component} from 'react'
import FollowUser from './FollowUser';
import UnfollowUser from './UnfollowUser';


class ProfileUserDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            followRequest : false,
            unfollowRequest : false
        }
        this.followButton = this.followButton.bind(this)
        this.followUser = this.followUser.bind(this)
        this.unfollowUser = this.unfollowUser.bind(this)
    }




    followButton(){
        if(!this.props.same && this.props.isFollowing){
            return <div>
                    <button className = "list-group-item btn" onClick ={this.unfollowUser}>Following</button>
                    {this.state.unfollowRequest ? <UnfollowUser refreshUser = {this.props.refreshUser} username = {this.props.userDetails.username} /> : null}
                </div>
        }
        else{
            if(!this.props.same && !this.props.isFollowing){
                return <div>
                        <button className = "list-group-item btn" onClick = {this.followUser} >Follow</button>
                        {this.state.followRequest ? <FollowUser refreshUser = {this.props.refreshUser} username = {this.props.userDetails.username} /> : null}
                    </div>
            }
        }
    }


    followUser(){
        this.setState({
            followRequest : true,
            unfollowRequest : false
        })
        return null
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
                    <h3 className="list-group-item list-group-item-dark">{this.props.userDetails.name}</h3>
                    <h4 className = "list-group-item list-group-item-info">@{this.props.userDetails.username}</h4>
                    {this.followButton()}
                </ul>
            </div>
        )
    }
}


export default ProfileUserDetails