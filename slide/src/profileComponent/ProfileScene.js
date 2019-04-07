import React, {Component} from 'react'

//import functions 
import {getUserProfileInfo} from './functions/index'


class ProfileScene extends Component {
    constructor(){
        super()

        this.state = {
            userBio: '',
            userPicUrl: '',
            username: '',
        }
    }

    componentDidMount(){
        let currentUser = '12345'
        getUserProfileInfo(currentUser)
            .then(user => {
                console.log(user)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        return(
            <div>
                <h1>Render User Profile</h1>
            </div>
        )
    }
}


export default ProfileScene 