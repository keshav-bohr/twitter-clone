import React, {Component} from 'react'

class ListTheFollow extends Component{
    constructor(props){
        super(props)
        this.showUserProfile = this.showUserProfile.bind(this)
    }

    showUserProfile(element){
        this.props.refreshUser(element)
    }


    render(){
        return(
            <div id = "followList">
                <h3>{this.props.title}</h3>
                {this.props.follow.length === 0 ? "--" : null }
                {this.props.follow.map((element, index) => {
                    return <a className = "list-group-item"  key = {index} onClick = {this.showUserProfile.bind(this,element)} >{element}</a>
                })}
            </div>
           
        )
    
    }
}

export default ListTheFollow