import React from "react";
import {
    logout,
    profile,
    updateProfile,
    findContentsForUser,
    getFollowers,
    getFollowings,
    viewProfile} from "../services/UserService";
import {Link} from "react-router-dom";
import "./ProfileComponent.css"

class ProfileComponent extends React.Component {
    state = {
        profile: {
            userId: 0,
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            roles: [],
            userType: "PUBLIC"
        },
        followers: [],
        following: [],
        contents: [],
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
                findContentsForUser(this.state.profile.userId)
                    .then(response => {this.setState({contents: this.sortByRecent(response)})});
                getFollowers(this.state.profile.userId)
                    .then(response => {this.setState({followers: response})});
                getFollowings(this.state.profile.userId)
                    .then(response => { this.setState({following: response })});
            });
    }

    sortByRecent = (activities) => {
        for (const act in activities) {
            activities[act].creationDate = new Date(activities[act].creationDate);
        }
        const sorted = activities.sort((a,b) => b.creationDate - a.creationDate);
        return sorted;
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
                                     <p>Type:
                                         <span className="wbdv-bold"> {this.state.profile.userType}</span>
                                     </p>
                                     <p>Name:&nbsp;&nbsp;
                                         {!this.state.editing && <span className="wbdv-bold">
                                             {this.state.profile.firstName} {this.state.profile.lastName}
                                         </span> }
                                     </p>
                                     {this.state.editing &&
                                      <div>
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
                                         {this.state.following && this.state.following < 1 &&
                                          <li> This field lay barren. </li>}
                                         {this.state.following.map(follow =>
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
                                      You have no recent activity.
                                  </div>
                                 }
                                 {this.state.contents &&
                                  this.state.contents.map( content =>
                                      <div key={content.contentId}>
                                          {content.contentType === "QUOTATION" &&
                                           <div className="wbdv-activity-details">
                                               You posted a new quote on <Link to={`/word/${content.word.text}`}>
                                               {content.word.text}
                                           </Link>-- "{content.text}"
                                           </div>}
                                          {content.contentType === "SENTENCE" &&
                                           <div className="wbdv-activity-details">
                                               You posted a new sentence on <Link to={`/word/${content.word.text}`}>
                                               {content.word.text}
                                           </Link>-- "{content.text}"
                                           </div>}
                                          {content.contentType === "DEFINITION" &&
                                           <div className="wbdv-activity-details">
                                               You posted a new definition on <Link to={`/word/${content.word.text}`}>
                                               {content.word.text}
                                           </Link>-- "{content.text}"
                                           </div>}
                                          {content.contentType === "COMMENT" &&
                                           <div className="wbdv-activity-details">
                                               You posted a new comment on <Link to={`/word/${content.word.text}`}>
                                               {content.word.text}
                                           </Link>-- "{content.text}"
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

export default ProfileComponent
