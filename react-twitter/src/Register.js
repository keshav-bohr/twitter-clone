import React, {Component} from 'react'
import axios from 'axios'


class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : "",
            username : "",
            password : "",
            message : ""
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
                message : "registration successful"
            })
        })
        .catch(error => {
            if(this.state.password.length >= 6){
                this.setState({
                    message : "Username is not available"
                })
            }
            else{
                this.setState({
                    message : "Password should have atleast 6 characters"
                })
            }
        })
    }


    render(){
        return(
            <div className = "form-group" >
                <form className = "form-horizontal" >
                    <input type = "text" className = "form-control" spellCheck="false" onChange = {this.setName} value = {this.state.name} placeholder = "Name" /> <br />
                    <input type = "text" className = "form-control" spellCheck="false" onChange = {this.setUsername} value = {this.state.username} placeholder = "Username" /> <br />
                    <input type = "password" className = "form-control" onChange = {this.setPassword} value = {this.state.password} placeholder = "Password" /> <br />
                    <button type = "button" className = "btn" onClick = {this.sendDataToDb}> Register </button>
                </form>
                {this.state.message}
            </div>
        )
    }
}

export default Register