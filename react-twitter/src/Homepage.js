import React, {Component} from 'react'
import Register from './Register'
import Login from './Login'

class Homepage extends Component{
    constructor(props){
        super(props)
        this.state = {
            register : false,
            login : true,
            loggedIn : false
        }
        this.setRegister = this.setRegister.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.checkLoginStatus = this.checkLoginStatus.bind(this)
    }

    setRegister(){
        this.setState({
            register : true,
            login : false
        })
    }

    setLogin(){
        this.setState({
            login : true,
            register : false
        })
    }

    checkLoginStatus(loggedInStatus){
        this.setState({
            loggedIn : loggedInStatus
        })
    }

    
    render(){
        return(
            <div>
                <div>
                    <button type = "button" onClick = {this.setRegister}> Register </button>
                    <button type = "button" onClick = {this.setLogin}> Login </button>
                </div>
                { this.state.register ? <Register /> : null }
                { this.state.login ? <Login checkLoginStatus = {this.checkLoginStatus} /> : null }
            </div>
        )
    }
}


export default Homepage