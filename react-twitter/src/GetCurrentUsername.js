import React, {Component} from 'react'
import axios from 'axios'


class GetCurrentUsername extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentUsernameRequest : true
        }
    }

    getCurrentUsername(){
        axios({
            method : 'get',
            url : 'http://localhost:3001/currentUsername'
            ,withCredentials : true
        })
        .then(res => {
            this.props.currentUsername(res.data.currentUsername)
            this.props.currentUser(res.data.currentUser)
            this.setState({
                currentUsernameRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){
        return(
            <div>
            {this.state.currentUsernameRequest ? this.getCurrentUsername() : null}
            </div>
        )
    }

}

export default GetCurrentUsername