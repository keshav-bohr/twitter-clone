import React, {Component} from 'react'
import axios from 'axios'


class UnblockUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            unblockRequest : true
        }
        this.setUnblockInDb = this.setUnblockInDb.bind(this)
    }

    setUnblockInDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/unblock',
            data :{
                username : this.props.username
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                unblockRequest :false
            })
            this.props.refreshUser(this.props.username)
        })
        .catch(error => {
            console.error(error)
        })
    }

    render(){
        return(<div>
                {this.state.unblockRequest ? this.setUnblockInDb() : null}
            </div>
        )
    }



}



export default UnblockUser