import React, {Component} from 'react'
import axios from 'axios'

class SingleTrend extends Component{
    constructor(props){
        super(props)
        this.state = {
            singleTrendRequest : true
            ,singleTrendTweets : []
        }
        this.fetchSingleTrendTweetsFromDb = this.fetchSingleTrendTweetsFromDb.bind(this)
    }

    fetchSingleTrendTweetsFromDb(){
        axios({
            method: 'post'
            ,url : 'http://localhost:3001/singleTrend'
            ,data : {
                hashtag : this.props.hashtag
            }
            ,withCredentials : true
        })
        .then(res => {
            this.setState({
                singleTrendTweets : res.data.singleTrendTweets
                ,singleTrendRequest : false
            })
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){
        return(
            <div>
                {this.state.singleTrendRequest ? this.fetchSingleTrendTweetsFromDb() : null}
                {this.state.singleTrendTweets.map((element, index) => {
                    return <div className = "col-6 offset-md-3" key = {index}>
                            <h3  style={{cursor : 'pointer'}} onClick = {this.props.setUserProfile.bind(this,element.username)} >@{element.username}</h3>
                            <h4><li>{element.content}</li></h4><hr /><br/>
                        </div>
                })}
            </div>
        )
    }
}


export default SingleTrend