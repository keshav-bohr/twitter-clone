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
        this.setRefreshTweets = this.setRefreshTweets.bind(this);
    }

    getTweetsFromDb(){
        axios({
            method: 'get',
            url: "http://localhost:3001/tweet/timeline",
            withCredentials : true
        })
        .then(res => {
            this.setState({
                tweets : res.data.tweets,
                refreshTweets : false
            })
        })
        .catch(error => {
            console.log(error)
        })
    }


    setRefreshTweets(){
        this.setState({
            refreshTweets : true
        })
    }

    componentDidMount(){
        this.getTweetsFromDb()
    }

    render(){
        return(
            <div>
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-md-4 offset-md-4" >
                            <button type = "button" className = "btn form-control input-lg" id="refreshTweets" onClick = {this.setRefreshTweets} >Refresh</button>
                            <br />
                            {this.state.tweets.map((element, index) => {
                                return <div  key = {index} ><br /><div>
                                    <h4 className="float-xl-right" style={{cursor : 'pointer'}} onClick = {this.props.setUserProfile.bind(this,element.username)} >@{element.username}</h4><br/>                                  
                                    <div >{element.content}</div>
                                </div>
                                <hr />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                {this.state.refreshTweets ? this.getTweetsFromDb() : null}
            </div>
        )
    }


}


export default TweetsOfFollowing