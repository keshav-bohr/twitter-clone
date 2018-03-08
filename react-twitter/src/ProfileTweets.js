import React, {Component} from 'react';
import DeleteTweet from './DeleteTweet';



class ProfileTweets extends Component{
    constructor(props){
        super(props)
        this.state = {
            mouseOver : false
        }
        this.setMouseOver = this.setMouseOver.bind(this)
        this.unsetMouseOver = this.unsetMouseOver.bind(this)
    }

    setMouseOver(){
        this.setState ({
            mouseOver : true
        })
    }
    unsetMouseOver(){
        this.setState({
            mouseOver : false
        })
    }


    render(){
        return(
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-md-4 offset-md-4" >
                            <ul className="list-group"><br /><br />
                            {this.props.profileData.tweets.map((element, index) => {
                                return <div onMouseEnter = {this.setMouseOver} onMouseLeave = {this.unsetMouseOver} key = {index} ><div>
                                    <li >{element.content}</li><br/>
                                    {this.props.profileData.same && this.state.mouseOver ? <DeleteTweet refreshUser = {this.props.refreshUser} username = {this.props.username} index = {index} /> : null}
                                    <hr />
                                </div>
                                <br />
                                </div>
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}

export default ProfileTweets