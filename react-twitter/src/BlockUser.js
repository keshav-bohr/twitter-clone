import React, {Component} from 'react'
import axios from 'axios'


class BlockUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            blockRequest : true
        }
        this.setBlockInDb = this.setBlockInDb.bind(this)
    }

    setBlockInDb(){
        axios({
            method : 'post',
            url : 'http://localhost:3001/block',
            data :{
                username : this.props.username
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                blockRequest :false
            })
            this.props.refreshUser(this.props.username)
        })
        .catch(error => {
            console.error(error)
        })
    }

    render(){
        return(<div>
                {this.state.blockRequest ? this.setBlockInDb() : null}
            </div>
        )
    }



}



export default BlockUser