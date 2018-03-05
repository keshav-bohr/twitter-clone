import React, {Component} from 'react'
import axios from 'axios'


class UnfollowUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            unfollowRequest : true
    }
    this.removeFollowingFromDb = this.removeFollowingFromDb.bind(this)
}

removeFollowingFromDb(){
    axios({
        method: 'post',
        url : 'http://localhost:3001/unfollowUser',
        data : {
            username: this.props.username
        },
        withCredentials : true
    })
    .then(res => {
        this.setState({
            unfollowRequest :false
        })
        this.props.refreshUser(this.props.username)
    })
}


render(){
    return(
        <div>
            {this.state.unfollowRequest ? this.removeFollowingFromDb() : null}
        </div>)
}



}


export default UnfollowUser
