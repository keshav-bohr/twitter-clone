import React, {Component} from 'react'
import axios from 'axios'


class FollowUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            followRequest : true
        }
        this.addFollowingInDb = this.addFollowingInDb.bind(this)
    }

    addFollowingInDb(){
        axios({
            method: 'post',
            url : 'http://localhost:3001/followUser',
            data : {
                username: this.props.username
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                followRequest :false
            })
            this.props.refreshUser(this.props.username)
        })
    }


    render(){
        return(
            <div>
                {this.state.followRequest ? this.addFollowingInDb() : null}
            </div>)
    }



}


export default FollowUser