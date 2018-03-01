import React, {Component} from 'react'
import axios from 'axios'


class TweetsOfFollowing extends Component{
    constructor(props){
        super(props)
        this.state = {
            refreshTweets : true,
            tweets : []
        }
        this.getTweetsFromDb = this.getTweetsFromDb.bind(this);
    }

    getTweetsFromDb(){
        axios({
            method: 'get',
            url: "http://localhost:3001/tweet/timeline",
            withCredentials : true
        })
        .then(res => {
            this.setState({
                notes : res.data,
                refreshTweets : false
            })
        })
        .catch(error => {
            console.log(error)
        })
    }


    componentDidMount(){
        this.getTweetsFromDb()
    }

    render(){
        return(
            <div>
                <p>hello</p>
            </div>
        )
    }

    // render(){
    //     return(
    //     )
    // }

}


export default TweetsOfFollowing