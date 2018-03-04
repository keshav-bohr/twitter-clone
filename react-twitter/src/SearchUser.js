import React, {Component} from 'react'
import axios from 'axios' 


class SearchUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            search : '',
            users : [],
            searchFlag : false
        }
        this.checkUserFromDb = this.checkUserFromDb.bind(this)
        this.setSearch = this.setSearch.bind(this)
    }

    setSearch(e){
        this.setState({
            search : e.target.value,
            searchFlag : true
        })
        // this.checkUserFromDb()
    }


    checkUserFromDb(){
        axios({
            method: 'post',
            url: "http://localhost:3001/user/search",
            data: {
                name: this.state.search,
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




    render(){
        return(
            <div>
                <input type = "text" onChange = {this.setSearch} />
                {/* {this.state.search ? this.checkUserFromDb() : null} */}
                {this.state.searchFlag ? this.checkUserFromDb() : null}
                <div >
                    {this.state.users.map((element, index) => {
                        return <div key = {index}>{element.name}</div>
                    })}
                </div>
            </div>
        )
    }


}

export default SearchUser