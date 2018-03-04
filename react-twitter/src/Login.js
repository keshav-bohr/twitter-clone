import React, {Component} from 'react'
import axios from 'axios'


class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : "",
            password : "",
            loggedIn : false,
            error : ''
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
        if(this.state.username && this.state.password){
            axios({
                method : 'post',
                url : 'http://localhost:3001/user/login',
                data : {
                    username : this.state.username,
                    password : this.state.password
                },
                withCredentials : true
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
                if(error.message === "Request failed with status code 401"){
                    this.setState({
                        error : "Invalid username or password"
                    })
                }
            })
        }

        else{
            this.setState({
                error : 'Username and password, both are required'
            })
        }
    }


    render(){
        return(
            <div className = "form-group">
                <div className = "alert alert-danger" role="alert">
                    {this.state.error}
                </div>
                <form className = "form-inline">
                    <input type = "text" className = "form-control " onChange = {this.setUsername} placeholder = "Username"/>
                    <input type = "password" className = "form-control " onChange = {this.setPassword} placeholder = "Password" />
                    <button type = "button" className = "btn btn-sm" onClick = {this.sendDataToDb}> Login </button>
                </form>
            </div>
        )
    }
}

export default Login