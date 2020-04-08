import React from "react";
import {logout, profile} from "../services/UserService";
import {Link} from "react-router-dom";
import "./ProfileComponent.css"

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
                 <div  className="wbdv-profile-background wbdv-profile-public">
                     <div className="wbdv-login-notice">
                         <h1>Please sign in or register to view your profile!</h1>
                         <hr/>
                         <Link to="/login" href="#">
                             <button className="btn btn-info">Sign In</button>
                         </Link>
                         &nbsp; &nbsp;
                         <Link to="/register" href="#">
                             <button className="btn btn-warning">Register</button>
                         </Link>
                     </div>
                 </div>}

                {this.state.profile.userType !== "PUBLIC" &&
                 <div  className="wbdv-profile-background">
                     <div className="wbdv-logout">
                         <button onClick={this.logout}
                                 className="btn btn-danger wbdv-logout-btn">
                             <i className="fa fa-sign-out"/>
                             Logout
                         </button>
                     </div>
                     <div className="row">
                         <div className="col-md-4">
                             <div className="wbdv-profile-section">
                                 <h2 className="wbdv-section-title">About</h2>
                                 <div className="wbdv-section-details">
                                     <p>Username:
                                         <span className="wbdv-bold"> {this.state.profile.username}</span>
                                     </p>
                                         <p>Name:
                                             <span className="wbdv-bold"> {this.state.profile.firstName} {this.state.profile.lastName}
                                             </span>
                                         </p>
                                         <p>Email:
                                             <span className="wbdv-bold"> {this.state.profile.email}</span>
                                         </p>
                                 </div>
                             </div>
                             <div className="wbdv-profile-section">
                                 <h2 className="wbdv-section-title">Following</h2>
                                 <div className="wbdv-section-details">
                                     <ul>
                                         <li>Example_User_A</li>
                                         <li>Example_User_B</li>
                                         <li>Example_User_C</li>
                                     </ul>
                                 </div>
                             </div>
                             <div className="wbdv-profile-section">
                                 <h2 className="wbdv-section-title">Followers</h2>
                                 <div className="wbdv-section-details">
                                     <ul>
                                         <li>Example_User_A</li>
                                         <li>Example_User_B</li>
                                         <li>Example_User_C</li>
                                     </ul>
                                 </div>
                             </div>
                         </div>
                         <div className="col-md-8 wbdv-profile-right">
                             <div className="wbdv-profile-section">
                                 <h2 className="wbdv-section-title">Recent Activity</h2>
                                 <div className="wbdv-activity-details">
                                     You uploaded a new word-- [hyperlink to word page].
                                 </div>
                                 <div className="wbdv-activity-details">
                                     You liked a new word-- [hyperlink to word page].
                                 </div>
                                 <div className="wbdv-activity-details">
                                     You commented on a word-- [hyperlink to word page].
                                 </div>
                                 <div className="wbdv-activity-details">
                                     You uploaded a new word-- [hyperlink to word page].
                                 </div>
                                 <div className="wbdv-activity-details">
                                     You liked a new word-- [hyperlink to word page].
                                 </div>
                                 <div className="wbdv-activity-details">
                                     You commented on a word-- [hyperlink to word page].
                                 </div>
                                 <div className="wbdv-activity-details">
                                     You uploaded a new word-- [hyperlink to word page].
                                 </div>
                                 <div className="wbdv-activity-details">
                                     You liked a new word-- [hyperlink to word page].
                                 </div>
                                 <div className="wbdv-activity-details">
                                     You commented on a word-- [hyperlink to word page].
                                 </div>
                             </div>
                         </div>
                     </div>
                     <hr/>

                 </div>
                }
            </div>
        )
    }
}

export default ProfileComponent
