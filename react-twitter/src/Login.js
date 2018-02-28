import React, {Component} from 'react'
import axios from 'axios'


class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : "",
            password : "",
            loggedIn : false
        }
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.sendDataToDb = this.sendDataToDb.bind(this);
    }

    setUsername(e){
        this.setState({
            username : e.target.value
        })
    }

    setPassword(e){
        this.setState({
            password : e.target.value
        })
    }

    sendDataToDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/user/login',
            data : {
                username : this.state.username,
                password : this.state.password
            }
        })
        .then(res => {
            this.setState({
                username: '',
                password : '',
                loggedIn : true
            })
            this.props.checkLoginStatus(this.state.loggedIn)
        })
        .catch(error => {
            console.error(error);
        })
    }


    render(){
        return(
            <div>
                <form>
                    <input type = "text" onChange = {this.setUsername} placeholder = "Username" />
                    <input type = "password" onChange = {this.setPassword} placeholder = "Password" />
                    <button type = "button" onClick = {this.sendDataToDb}> Login </button>
                </form>
                {/* { this.state.loggedIn ? <TweetsOfFollowing /> : null } */}
            </div>
        )
    }
}

export default Login