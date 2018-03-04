import React, {Component} from 'react'
import axios from 'axios'


class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : "",
            username : "",
            password : "",
            messageFailure : "",
            messageSuccess : ''
        }
        this.setName = this.setName.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.sendDataToDb = this.sendDataToDb.bind(this);
    }

    setName(e){
        this.setState({
            name : e.target.value
        })
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
        if(this.state.name && this.state.username && this.state.password){
            axios({
                method : 'post',
                url : 'http://localhost:3001/user/register',
                data : {
                    name : this.state.name,
                    username : this.state.username,
                    password : this.state.password
                }
            })
            .then(res => {
                this.setState({
                    name: '',
                    username: '',
                    password : '',
                    messageSuccess : "registration successful",
                    messageFailure : ''
                })
            })
            .catch(error => {
                if(this.state.password.length >= 6){
                    this.setState({
                        messageFailure : "Username is not available",
                        messageSuccess : ''
                    })
                }
                else{
                    this.setState({
                        messageFailure : "Password should have atleast 6 characters",
                        messageSuccess : ''
                    })
                }
            })
        }

        else{
            this.setState({
                message : 'Required : Name, Username And Password'
            })
        }
    }


    render(){
        return(
            <div className = "form-group" >
                <form className = "form-horizontal" >
                    <input type = "text" className = "form-control" spellCheck="false" onChange = {this.setName} value = {this.state.name} placeholder = "Name*" /> <br />
                    <input type = "text" className = "form-control" spellCheck="false" onChange = {this.setUsername} value = {this.state.username} placeholder = "Username*" /> <br />
                    <input type = "password" className = "form-control" onChange = {this.setPassword} value = {this.state.password} placeholder = "Password*" /> <br />
                    <button type = "button" className = "btn" onClick = {this.sendDataToDb}> Register </button>
                </form>
                <br />
                <div className = "alert alert-danger" role="alert">
                    {this.state.messageFailure}
                </div>
                <div className = "alert alert-success" role="alert">
                    {this.state.messageSuccess}
                </div>
            </div>
        )
    }
}

export default Register