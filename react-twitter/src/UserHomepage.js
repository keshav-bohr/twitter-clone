import React, {Component} from 'react'
// import axios from 'axios'
import TweetsOfFollowing from './TweetsOfFollowing'
import CreateTweets from './CreateTweets';
import SearchUser from './SearchUser';

class UserHomepage extends Component{
    constructor(props){
        super(props)
        this.state = {
            message : ''
        }
        this.showUserHomepage = this.showUserHomepage.bind(this);
        this.setMessage = this.setMessage.bind(this)
    }

    setMessage(messageFromChild){
        this.setState({
            message : messageFromChild
        })
    }

    showUserHomepage(){
        return <div>
                    {<SearchUser />}
                    {<CreateTweets setMessage = {this.setMessage}/>}
                    {<TweetsOfFollowing setMessage = {this.setMessage}/> }
                </div>
    }


    render(){
        return (
            <div>
                <div className = "alert alert-success" id = "successMessage" role="alert">
                    {this.state.message}
                </div>
                <div className = "header">
                    <p>hello</p>
                </div>
                {this.showUserHomepage()}
            </div>
        )
    }
}

export default UserHomepage