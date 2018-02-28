import React, {Component} from 'react'
import axios from 'axios'


class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : "",
            username : "",
            password : "",
            email: "",
            DOB: ""
        }
        this.setName = this.setName.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setDOB = this.setDOB.bind(this);
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

    setEmail(e){
        this.setState({
            email : e.target.value
        })
    }

    setDOB(e){
        this.setState({
            DOB : e.target.value
        })
    }

    sendDataToDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/user/register',
            data : {
                name : this.state.name,
                username : this.state.username,
                password : this.state.password,
                email : this.state.email,
                DOB: this.state.DOB
            }
        })
        .then(res => {
            this.setState({
                name: '',
                username: '',
                password : '',
                email: '',
                DOB: ''
            })
        })
        .catch(error => {
            console.error(error);
        })
    }


    render(){
        return(
            <div>
                <form>
                    <input type = "text" onChange = {this.setName} value = {this.state.name} placeholder = "Name" />
                    <input type = "text" onChange = {this.setUsername} value = {this.state.username} placeholder = "Username" />
                    <input type = "password" onChange = {this.setPassword} value = {this.state.password} placeholder = "Password" />
                    <input type = "text" onChange = {this.setEmail} value = {this.state.email} placeholder = "Email" />
                    <input type = "text" onChange = {this.setDOB} value = {this.state.DOB} placeholder = "Date of Birth (mm/dd/yyyy)" />
                    <button type = "button" onClick = {this.sendDataToDb}> Register </button>
                </form>
            </div>
        )
    }
}

export default Register