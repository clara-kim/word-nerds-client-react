import React from "react";
import {logout, profile} from "../services/UserService";
import {Link} from "react-router-dom";

class ProfileComponent extends React.Component {
    state = {
        profile: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            roles: [],
            userType: "PUBLIC"
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                                               profile: profile
                                           }))
    }

    logout = () =>
        logout()
            .then(status => {
                this.props.updateUser();
                this.props.history.push('/')
            })

    render() {
        return(
            <div>
                {this.state.profile.userType === "PUBLIC" &&
                 <div>
                     <h1>Please login to view your profile!</h1>
                     <Link to="/register" href="#"></Link>
                 </div>}

                {this.state.profile.userType !== "PUBLIC" &&
                 <div>
                     <h1>Profile</h1>
                     Hi, {this.state.profile.username}!
                     <hr/>
                     <button onClick={this.logout} className={`btn btn-danger`}>
                         Logout
                     </button>
                 </div>
                }
            </div>
        )
    }
}

export default ProfileComponent
