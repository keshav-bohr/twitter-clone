import React, {Component} from 'react'
import axios from 'axios'


class Logout extends Component{
    constructor(props){
        super(props)
        this.state = {
            logoutRequest : false
            ,loggedOut : false
        }
        this.setLogoutRequest = this.setLogoutRequest.bind(this)
        this.logoutFromDb = this.logoutFromDb.bind(this)
    }


    setLogoutRequest(){
        this.setState({
            logoutRequest : true
        })
    }

    logoutFromDb(){
        axios({
            method: 'post',
            url : 'http://localhost:3001/user/logout',
            withCredentials :true
        })
        .then(res => {
            this.setState({
                loggedOut : true
            })
        })
        .catch(error => {
            console.error(error)
        })
    }



    render(){
        return(
            <div>
                <button type = "submit" id = "logoutButton" className = "btn" onClick = {this.setLogoutRequest} >Logout</button>
                {this.state.logoutRequest ? this.logoutFromDb() : null}
                {this.state.loggedOut ? window.location.reload() : null}
            </div>
        )
    }
}


export default Logout