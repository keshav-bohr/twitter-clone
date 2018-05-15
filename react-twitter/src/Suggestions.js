import React, {Component} from 'react'
import axios from 'axios'


class Suggestions extends Component{
    constructor(props){
        super(props)
        this.state = {
            suggestionRequest : true
            ,suggestions : []
        }
        this.getSuggestionsFromDb = this.getSuggestionsFromDb.bind(this)
    }

    getSuggestionsFromDb(){
        axios({
            method: 'get'
            ,url : 'http://localhost:3001/suggestions'
            ,withCredentials : true
        })
        .then(res => {
            this.setState({
                suggestions : res.data.suggestions
                ,suggestionRequest : false
            })
        })
        .catch(error => {
            console.error(error);
        })
    }


    render(){
        return(
            <div className = "container col-4" id = "suggestions"><br />
                {this.state.suggestions.length!==0 ? <div className = "col-10 offset-md-2"><h3>Suggestions</h3><hr /></div> : null}
                {this.state.suggestionRequest ? this.getSuggestionsFromDb() : null}
                {this.state.suggestions.map((element, index) => {
                    return <div key = {index} className = "row" >
                            <div  className = "col-8 offset-md-3">
                                <h4 style={{cursor : 'pointer'}} onClick = {this.props.setUserProfile.bind(this,element.suggestion)} className = "float-left">{element.name}</h4>
                                <h5 style={{cursor : 'pointer'}} onClick = {this.props.setUserProfile.bind(this,element.suggestion)} className = "float-right">@{element.suggestion}</h5><br /><br />
                                <h6 >{element.counter} mututal followers</h6>
                                <hr />
                            </div>
                        </div>
                })}
            </div>
        )
    }



}

export default Suggestions