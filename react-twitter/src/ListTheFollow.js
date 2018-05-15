import React, {Component} from 'react'

class ListTheFollow extends Component{
    constructor(props){
        super(props)
        this.showUserProfile = this.showUserProfile.bind(this)
    }

    showUserProfile(element){
        this.props.refreshUser(element)
        this.props.unsetListingFollow();
    }


    render(){
        return(
            <div id = "followList">
                <br />
                <h3>{this.props.title}</h3>
                {this.props.follow.length === 0 ? "--" : null }
                {this.props.follow.map((element, index) => {
                    return <div key = {index}> 
                        <a style={{cursor : 'pointer'}} onClick = {this.showUserProfile.bind(this,element)}>{element}</a>
                        <hr />
                        </div>
                })}
            </div>
           
        )
    
    }
}

export default ListTheFollow