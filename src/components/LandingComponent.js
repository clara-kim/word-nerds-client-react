import React from "react";
import "./LandingComponent.css"
import {profile} from "../services/UserService";
import {Link} from "react-router-dom";

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
                 </div> }

                {/* Blurb About Word Nerds -- VIEWABLE BY GENERAL PUBLIC */}
                <div id="wbdv-blurb">
                    <h5 className="">About Word Nerds</h5>
                    <p>
                        Word Nerds is a community dictionary where users personally engage with
                        words and enhance them with meaningful human input. We want to ignite
                        young people’s interest in vocabulary and books by giving them a space to
                        engage with and take ownership of their language.
                    </p>
                    <p>
                        Developers: Christopher Sims, Clara Kim, Rebecca Bonne-Annee, Yarrow Simmons
                    </p>
                    <p>
                        <Link to="/privacy-policy" href="#">
                            OUR PRIVACY POLICY
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp; [&nbsp;Photo Credits:
                        <a href="https://www.pexels.com/photo/blur-book-stack-books-bookshelves-590493/">
                            &nbsp;&nbsp;&nbsp;&nbsp;Bookshelves (Janko Ferlic)
                        </a>
                        <a href="https://www.pexels.com/photo/letter-cubes-1822568/">
                            &nbsp;&nbsp;&nbsp;&nbsp;Letter Cubes (Suzy Hazelwood)
                        </a>
                        <a href="https://pixabay.com/photos/typewriter-book-notes-paper-801921/">
                            &nbsp;&nbsp;&nbsp;&nbsp;Typewriter
                        </a>
                        &nbsp;]
                    </p>

                </div>
            </div>
        )
    }
}

export default LandingComponent
