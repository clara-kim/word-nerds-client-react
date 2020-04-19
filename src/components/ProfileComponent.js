import React from "react";
import {logout, profile, updateProfile} from "../services/UserService";
import {Link} from "react-router-dom";
import "./ProfileComponent.css"

class ProfileComponent extends React.Component {
    state = {
        profile: {
            userId: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            roles: [],
            userType: "PUBLIC"
        },
        editing: false
    }

    componentDidMount() {
        profile()
            .then(profile => {
                this.setState({profile: profile});
                if (profile.firstName === null) {
                    this.setState({
                                      profile: {
                                          ...this.state.profile,
                                          firstName: ""
                                      }
                                  })
                }
                if (profile.lastName === null) {
                    this.setState({
                                      profile: {
                                          ...this.state.profile,
                                          lastName: ""
                                      }
                                  })
                }
                if (profile.email === null) {
                    this.setState({
                                      profile: {
                                          ...this.state.profile,
                                          email: ""
                                      }
                                  })
                }
            })
    }

    logout = () =>
        logout()
            .then(status => {
                this.props.updateUser();
                this.props.history.push('/')
            })

    updateProfile = () =>
        updateProfile(this.state.profile).then(response => this.setState({editing: false}));

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
                                 <h2 className="wbdv-section-title">
                                     About
                                     {!this.state.editing &&
                                      <button id="wbdv-profile-edit" className="btn btn-warning"
                                              title="Edit My Details"
                                              onClick={() => this.setState({editing: true})}>
                                          Edit <i className="fa fa-edit"></i>
                                      </button>}
                                     {this.state.editing &&
                                      <button id="wbdv-profile-edit" className="btn btn-success"
                                              title="Save My Details"
                                              onClick={this.updateProfile}>
                                          Save <i className="fa fa-save"></i>
                                      </button>}
                                 </h2>
                                 <div className="wbdv-section-details">
                                     <p>Username:
                                         <span className="wbdv-bold"> {this.state.profile.username}</span>
                                     </p>
                                         <p>Name:&nbsp;&nbsp;
                                             {!this.state.editing && <span className="wbdv-bold">
                                                 {this.state.profile.firstName} {this.state.profile.lastName}
                                             </span> }
                                         </p>
                                         {this.state.editing && <div>
                                             <input className="input-group" type="text"
                                                    placeholder="First Name" title="First Name"
                                                    value={this.state.profile.firstName}
                                                    onChange={(e) => this.setState({
                                                                                       profile: {
                                                                                           ...this.state.profile,
                                                                                           firstName: e.target.value
                                                                                       }
                                                                                   })}/>
                                             <input className="input-group" type="text"
                                                    placeholder="Last Name" title="Last Name"
                                                    value={this.state.profile.lastName}
                                                    onChange={(e) => this.setState({
                                                                                       profile: {
                                                                                           ...this.state.profile,
                                                                                           lastName: e.target.value
                                                                                       }
                                                                                   })}/>
                                         </div>}
                                         <p>Email:&nbsp;&nbsp;
                                             {!this.state.editing && <span className="wbdv-bold">
                                                 {this.state.profile.email}
                                             </span>}
                                             { this.state.editing &&
                                               <input className="input-group" type="email"
                                                      placeholder="Email" title="Email"
                                                      value={this.state.profile.email}
                                                      onChange={(e) => this.setState({
                                                             profile: {
                                                                 ...this.state.profile,
                                                                 email: e.target.value
                                                             }
                                                         })}/>}
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
