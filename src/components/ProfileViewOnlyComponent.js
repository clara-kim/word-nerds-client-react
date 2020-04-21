import React from "react";
import {viewProfile, deleteUser} from "../services/UserService";
import "./ProfileComponent.css"

class ProfileViewOnlyComponent extends React.Component {
    state = {
        viewProfile: {
            userId: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: "PUBLIC"
        }
    }

    componentDidMount() {
        viewProfile(this.props.viewUserId)
            .then(profile => {if (profile !== undefined){this.setState({viewProfile: profile})}})
    }

    deleteUser(userId) {
        deleteUser(userId)
            .then(response => {
            this.setState({viewProfile: {...this.state.viewProfile, userType: "PUBLIC"}})
        })
    }

    render() {
        return(
            <div>
                {this.state.viewProfile.userType === "PUBLIC" &&
                 <div  className="wbdv-profile-background wbdv-profile-public">
                     <div className="wbdv-login-notice">
                         <h1>This user does not exist!</h1>
                     </div>
                 </div>}

                {this.state.viewProfile.userType !== "PUBLIC" &&
                 <div className="wbdv-profile-background">
                     { this.state.viewProfile.userType !== "ADMIN" &&
                     <div className="wbdv-logout">
                         <button
                                 className="btn btn-warning wbdv-logout-btn">
                             <i className="fa fa-thumbs-up"/>
                             &nbsp;Upgrade this user to ADMIN!
                         </button>
                         &nbsp;&nbsp;
                         <button onClick={() => this.deleteUser(this.state.viewProfile.userId)}
                             className="btn btn-danger wbdv-logout-btn">
                             <i className="fa fa-trash"/>
                             &nbsp;Delete this user.
                         </button>
                     </div> }
                     { this.state.viewProfile.userType !== "ADMIN" && <br/>}
                     <div className="row">
                         <div className="col-md-4">
                             <div className="wbdv-profile-section">
                                 <h2 className="wbdv-section-title">
                                     About
                                 </h2>
                                 <div className="wbdv-section-details">
                                     <p>Username:
                                         <span className="wbdv-bold"> {this.state.viewProfile.username}</span>
                                     </p>
                                     <p>Name:&nbsp;&nbsp;
                                         <span className="wbdv-bold">
                                             {this.state.viewProfile.firstName} {this.state.viewProfile.lastName}
                                         </span>
                                     </p>
                                     <p>Email:&nbsp;&nbsp;
                                         <span className="wbdv-bold">
                                                 {this.state.viewProfile.email}
                                         </span>
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

export default ProfileViewOnlyComponent
