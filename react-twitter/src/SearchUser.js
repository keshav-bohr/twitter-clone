import React, {Component} from 'react'
import axios from 'axios' 


class SearchUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchContent : '',
            users : [],
            searchFlag : false,
        }
        this.checkUserFromDb = this.checkUserFromDb.bind(this)
        this.setSearch = this.setSearch.bind(this)
        this.showUserProfile = this.showUserProfile.bind(this)
    }

    setSearch(e){
        this.setState({
            searchContent : e.target.value,
            searchFlag : true
        })
    }


    checkUserFromDb(){
        axios({
            method: 'post',
            url: "http://localhost:3001/user/search",
            data: {
                name: this.state.searchContent,
            },
            withCredentials : true
        })
        .then(res => {
            this.setState({
                users : res.data.users,
                searchFlag : false
            })
        })
        .catch(error => {
            console.error(error);
        })
    }


    showUserProfile(username){
        this.props.userProfile(username)
        this.setState({
            searchContent : ''
        })
    }



    render(){
        var showing = this.state.searchContent ? 'block' : 'none'
        return(
            <div id = "searchResults">
                <input type = "text" onChange = {this.setSearch} className = "form-control" value = {this.state.searchContent} placeholder = "Search" />
                {this.state.searchFlag ? this.checkUserFromDb() : null}
                <div  style = {{display : showing}} >
                    {this.state.users.map((element, index) => {
                        return <a className = "list-group-item"  key = {index} onClick = {this.showUserProfile.bind(this,element.username)} >{element.name}</a>
                    })}
                </div>
            </div>
        )
    }


}

export default SearchUser