import React, { Component } from 'react'
import ListTheFollow from './ListTheFollow';


class ProfileFollowDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            followArray : [],
            listingFollow : false,
            title : ''
        }
        this.callFollowModal = this.callFollowModal.bind(this)
        this.unsetListingFollow = this.unsetListingFollow.bind(this)
    }


    

    callFollowModal(title, follow){
        this.setState({
            followArray : follow,
            listingFollow : true,
            title : title
        })
    }


    unsetListingFollow(){
        this.setState({
            listingFollow : false
        })
    }

    render() {
        return (
            <div id="profileFollowDetails" onMouseLeave = {this.unsetListingFollow}>
                <ul className="list-group">
                    <h3 className="list-group-item" onClick = {this.callFollowModal.bind(this, 'Following', this.props.followDetails.following)} style={{cursor : 'pointer'}} > Following     {this.props.followDetails.following.length}</h3>
                    <h3 className="list-group-item" onClick = {this.callFollowModal.bind(this,'Followers', this.props.followDetails.follower)}  style={{cursor : 'pointer'}}  >Follower     {this.props.followDetails.follower.length}</h3>
                </ul>
                {this.state.listingFollow ? <ListTheFollow title = {this.state.title} unsetListingFollow = {this.unsetListingFollow} follow = {this.state.followArray} refreshUser = {this.props.refreshUser}/> : null}
            </div>
            
        )
    }
}

export default ProfileFollowDetails