import React, {Component} from 'react'
import axios from 'axios'

class DeleteTweet extends Component{
    constructor(props){
        super(props)
        this.state = {
            deleteTweetRequest : false
        }
        this.removeTweetFromDb = this.removeTweetFromDb.bind(this)
        this.setDeleteTweetRequest = this.setDeleteTweetRequest.bind(this)
    }

    removeTweetFromDb(){
        axios({
            method: 'post'
            ,url : 'http://localhost:3001/tweet/delete'
            ,data : {
                index : this.props.index
            }
            ,withCredentials : true
        })
        .then(res => {
            this.props.refreshUser(this.props.username)
            this.setState({
                deleteTweetRequest: false
            })
        })
        .catch(error => {
            console.error(error);
        })
    }

    setDeleteTweetRequest(){
        this.setState({
            deleteTweetRequest : true
        })
    }


    render(){
        return(
            <div className = "float-left">
                <button type = "button" className = "btn btn-sm" onClick = {this.setDeleteTweetRequest} >Delete</button>
                {this.state.deleteTweetRequest ? this.removeTweetFromDb() : null}
            </div>
        )
    }

}

export default DeleteTweet