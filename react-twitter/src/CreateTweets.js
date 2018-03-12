import React, {Component} from 'react'
import axios from 'axios'


class CreateTweets extends Component{
    constructor(props){
        super(props)
        this.state = {
            content : '',
            private : false
        }
        this.setContent = this.setContent.bind(this);
        this.setPrivate = this.setPrivate.bind(this);
        this.sendTweetToDB = this.sendTweetToDB.bind(this)
    }


    setContent(e){
        this.setState({
            content : e.target.value
        })
    }


    setPrivate(){
        this.setState({
            private: !this.state.private
        })
    }


    sendTweetToDB(){
        if(this.state.content){
            axios({
                method: 'post',
                url : 'http://localhost:3001/tweet/create',
                data : {
                    content : this.state.content,
                    public : !this.state.private
                },
                withCredentials :true
            })
            .then(res => {
                this.setState({
                    content : '',
                    private : false
                })
                this.props.setMessage("Kweet Created")
            })
            .catch(error => {
                this.props.setMessage("Kweet could not be created. Some internal error occurred")
            })
        }
    }

    render(){
        return(
            <div>
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-md-4 offset-md-4" >
                            {this.state.content ?
                            <div id = "createTweet" >
                                <input type = "checkbox" value = {this.state.private} onChange = {this.setPrivate} />
                                <span>    Private</span>
                                <button type = "button" id = "createTweetButton" className = "btn btn-sm" onClick = {this.sendTweetToDB} > Create Kweet </button>
                            </div> :<div><br /></div>}
                            
                            <textarea rows = "1" type="text" className="form-control input-lg" id="myInput" value = {this.state.content} onChange = {this.setContent} placeholder="Create Kweet Here" />
                            {/* listtweets */}
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default CreateTweets