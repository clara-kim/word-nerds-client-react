import React from "react";
import {viewProfile, updateProfile, deleteUser, findContentsForUser} from "../services/UserService";
import "./ProfileComponent.css"
import {Link} from "react-router-dom";

class ProfileViewOnlyComponent extends React.Component {
    state = {
        viewProfile: {
            userId: 0,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: "PUBLIC"
        },
        followers: [],
        following: [],
        contents: [],
    }

    componentDidMount() {
        viewProfile(this.props.viewUserId)
            .then(profile => {
                if (profile !== undefined){this.setState({viewProfile: profile})};
                  findContentsForUser(this.state.viewProfile.userId)
                      .then(response => {this.setState({contents: this.sortByRecent(response)})})
            }
            )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.viewUserId !== this.props.viewUserId) {
            viewProfile(this.props.viewUserId)
                .then(profile => {
                          if (profile !== undefined){this.setState({viewProfile: profile})};
                          findContentsForUser(this.state.viewProfile.userId)
                              .then(response => {this.setState({contents: this.sortByRecent(response)})})
                      }
                )
        }
    }

    sortByRecent = (activities) => {
        for (const act in activities) {
            activities[act].creationDate = new Date(activities[act].creationDate);
        }
        const sorted = activities.sort((a,b) => b.creationDate - a.creationDate);
        return sorted;
    }

    deleteUser(userId) {
        deleteUser(userId)
            .then(response => {
            this.setState({viewProfile: {...this.state.viewProfile, userType: "PUBLIC"}})
        })
    }

    makeAdmin(){
        updateProfile({userId: this.state.viewProfile.userId, userType: "ADMIN"});
        this.setState({viewProfile: {...this.state.viewProfile, userType:"ADMIN"}});
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
                     { this.props.profile.userType === "ADMIN" &&
                     <div className="wbdv-logout">
                         {this.state.viewProfile.userType !== "ADMIN" &&
                          <button onClick={() => this.makeAdmin()}
                                  className="btn btn-warning wbdv-logout-btn wbdv-left">
                              <i className="fa fa-thumbs-up"/>
                              &nbsp;Upgrade this user to ADMIN!
                          </button>
                         }
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
                                     <p>Type:
                                         <span className="wbdv-bold"> {this.state.viewProfile.userType}</span>
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
                                         {this.state.following && this.state.following < 1 &&
                                          <li> This field lay barren. </li>}
                                         {this.state.following && this.state.following.map(follow =>
                                           <li key={follow.userId}>
                                               <Link to={`/profile/${follow.userId}`}>
                                                   {follow.username}
                                               </Link>
                                           </li>
                                         )}
                                     </ul>
                                 </div>
                             </div>
                             <div className="wbdv-profile-section">
                                 <h2 className="wbdv-section-title">Followers</h2>
                                 <div className="wbdv-section-details">
                                     <ul>
                                         {this.state.followers && this.state.followers < 1 &&
                                          <li> This field lay barren. </li>}
                                         {this.state.followers.map(follow =>
                                           <li key={follow.userId}>
                                               <Link to={`/profile/${follow.userId}`}>
                                                   {follow.username}
                                               </Link>
                                           </li>
                                         )}
                                     </ul>
                                 </div>
                             </div>
                         </div>
                         <div className="col-md-8 wbdv-profile-right">
                             <div className="wbdv-profile-section">
                                 <h2 className="wbdv-section-title">Recent Activity</h2>
                                 {this.state.contents && this.state.contents < 1 &&
                                  <div className="wbdv-activity-details">
                                      No recent activity.
                                  </div>
                                 }
                                 {this.state.contents &&
                                  this.state.contents.map( content =>
                                       <div key={content.contentId}>
                                           {content.contentType === "QUOTATION" &&
                                            <div className="wbdv-activity-details">
                                                You posted a new quote-- "{content.text}"
                                            </div>}
                                           {content.contentType === "SENTENCE" &&
                                            <div className="wbdv-activity-details">
                                                You posted a new sentence-- "{content.text}"
                                            </div>}
                                           {content.contentType === "DEFINITION" &&
                                            <div className="wbdv-activity-details">
                                                You posted a new definition-- "{content.text}"
                                            </div>}
                                           {content.contentType === "COMMENT" &&
                                            <div className="wbdv-activity-details">
                                                You posted a new definition-- "{content.text}"
                                            </div>}
                                       </div>
                                  )}
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
