import React, {Component} from 'react'
import axios from 'axios'

class Trending extends Component{
    constructor(props){
        super(props)
        this.state = {
            trendingRequest : true
            ,trendings : []
        }
        this.getTrendingsFromDb = this.getTrendingsFromDb.bind(this)
    }

    getTrendingsFromDb(){
        axios({
            method : 'get'
            ,url : 'http://localhost:3001/trendings'
            ,withCredentials : true
        })
        .then(res => {
            this.setState({
                trendings : res.data.trendings
                ,trendingRequest : false
            })
        })
    }


    componentDidUpdate(prevProps, prevState){
        if(prevProps.message !== ''){
            this.setState({
                trendingRequest : true
            })
        }
    }


    render(){
        return(
            <div className = "container col-4" id = "trending"><br />
                {this.state.trendings.length !== 0 ?<div className = "col-8 offset-md-1"><h3>Trends for you</h3><hr /></div> : null}
                {this.state.trendingRequest ? this.getTrendingsFromDb() : null}
                {this.state.trendings.map((element, index) => {
                    return <div key = {index} className = "row" >
                            <div  className = "col-6 offset-md-2">
                                <h4 onClick = {this.props.setSingleTrend.bind(this,element.hashtag)}>#{element.hashtag}</h4>
                                <h6 >Trends : {element.counter}</h6>
                                <hr />
                            </div>
                        </div>
                })}
            </div>
        )
    }


}

export default Trending