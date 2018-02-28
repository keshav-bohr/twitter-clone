import React, {Component} from 'react'
import Register from './Register'
import Login from './Login'

class Homepage extends Component{
    constructor(props){
        super(props)
        this.state = {
            // error : '',
            register : false,
            login : true,
            loggedIn : false
        }
        this.setRegister = this.setRegister.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.checkLoginStatus = this.checkLoginStatus.bind(this)
        // this.setError = this.setError.bind(this);
    }

    // setError(errorFromServer){
    //     this.setState({
    //       error : errorFromServer 
    //     })
    // }
    

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
                {/* <p>{this.state.error}</p> */}
                <div>
                    <button type = "button" onClick = {this.setRegister}> Register </button>
                    <button type = "button" onClick = {this.setLogin}> Login </button>
                </div>
                { this.state.register ? <Register errorMessage = {this.setError}/> : null }
                { this.state.login ? <Login checkLoginStatus = {this.checkLoginStatus} errorMessage = {this.setError} /> : null }
            </div>
        )
    }
}


export default Homepage