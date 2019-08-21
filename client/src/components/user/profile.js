import React from 'react';
import { getUser } from '../api';
import { isAuthenticated } from '../auth';


class Profile extends React.Component {
    state={
        user: "",
        error: ""
    }
    
    componentDidMount() {
        const token = isAuthenticated().token;
        getUser(token).then(data => {
            if(data.error){
                this.setState({ error: data.error })
            } else {
                console.log(data);
                this.setState({ user: data });
            }
        }); 
    }

    render(){
        const { user } = this.state;

        return(
            <div>
                <h1>Profile Page</h1>
                <h1>Name: {user.name}</h1>
            </div>
        )
    }
}

export default Profile;