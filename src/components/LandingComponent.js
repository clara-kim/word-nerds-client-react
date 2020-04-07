import React from "react";
import "./LandingComponent.css"
import {profile} from "../services/UserService";

/*
This is the landing component that acts as the home page.
It includes the word of the day and daily stats.
 */
class LandingComponent extends React.Component {

    state = {
        profile: { // user information (if user is logged in)
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: "PUBLIC"
        }
    }

    // Requests user information upon component mount.
    // Content displayed is user-specific.
    componentDidMount(){
        profile()
            .then(profile =>
                      this.setState({profile: profile}))
    }

    render (){
        return(
            <div>
                {/* Word of the Day */}
                <div className="parallax" id="word-of-day">
                    <h3 className="section-title">WORD &middot; OF &middot; THE &middot; DAY</h3>
                    <div id="word-of-day-details">
                        <h2 id="wod-word">inchoate</h2>
                        <p id="wod-def">just begun and so not fully formed or developed; rudimentary</p>
                        <p id="wod-source">lexico.com</p>
                    </div>

                </div>

                {/* Daily Stats -- VIEWABLE BY GENERAL PUBLIC */}
                <div className="parallax" id="word-stats">
                    <h2 className="section-title">&middot; WORDLY HAPPENINGS &middot;</h2>
                    <br/>
                    <div className="row container">
                        <div className="col-3 wbdv-wordly-happenings-section">
                            <h3>Most Liked Words</h3>
                            <ol>
                                <li>Lorem</li>
                                <li>Ipsum</li>
                                <li>Dolor</li>
                                <li>Sit</li>
                                <li>Amet</li>
                            </ol>
                        </div>
                        <div className="col-1"/>
                        <div className="col-8 wbdv-wordly-happenings-section">
                            <h3>Most Liked Sentences</h3>
                            <ol>
                                <li>Consectetur</li>
                                <li>Adipiscing</li>
                                <li>Elit</li>
                                <li>Sed</li>
                                <li>Eiusmod</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* PERSONAL STATS - VIEWABLE ONLY TO LOGGED IN USER */}
                {this.state.profile.userType !== "PUBLIC" &&
                 <div className="parallax" id="wbdv-personal-stats">
                     <h2 className="section-title">&middot; PERSONAL AFFAIRS &middot;</h2>
                     <br/>
                     <div className="row container">
                         <div className="col-4 wbdv-wordly-happenings-section">
                             <h3>Recently Liked Words</h3>
                             <ol>
                                 <li>Lorem</li>
                                 <li>Ipsum</li>
                                 <li>Dolor</li>
                                 <li>Sit</li>
                                 <li>Amet</li>
                             </ol>
                         </div>
                         <div className="col-1"/>
                         <div className="col-7 wbdv-wordly-happenings-section">
                             <h3>Recently Liked Sentences</h3>
                             <ol>
                                 <li>Consectetur</li>
                                 <li>Adipiscing</li>
                                 <li>Elit</li>
                                 <li>Sed</li>
                                 <li>Eiusmod</li>
                             </ol>
                         </div>
                     </div>
                 </div>
                }
            </div>
        )
    }
}

export default LandingComponent
