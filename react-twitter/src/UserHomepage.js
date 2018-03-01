import React, {Component} from 'react'
// import axios from 'axios'
import TweetsOfFollowing from './TweetsOfFollowing'

class UserHomepage extends Component{
    constructor(props){
        super(props)
        this.showUserHomepage = this.showUserHomepage.bind(this)
    }

    showUserHomepage(){
        return <div>{<TweetsOfFollowing /> }</div>
    }


    render(){
        return (
            this.showUserHomepage()
        )
    }
}

export default UserHomepage