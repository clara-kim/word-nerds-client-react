import React from "react";
import "./LandingComponent.css"
import {profile, findContentsForUser} from "../services/UserService";
import {findAllContent} from "../services/ContentService";
import {Link} from "react-router-dom";

/*
This is the landing component that acts as the home page.
It includes the word of the day and daily stats.
 */
class LandingComponent extends React.Component {

    state = {
        profile: { // user information (if user is logged in)
            userId: 0,
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: "PUBLIC"
        },
        allContents: [],
        contents: []
    }

    // Requests user information upon component mount.
    // Content displayed is user-specific.
    componentDidMount(){
        profile()
            .then(profile => {
                      this.setState({profile: profile});
                      if (profile.userType === "MEMBER" || profile.userType ==="ADMIN"){
                          findContentsForUser(this.state.profile.userId)
                              .then(response => {this.setState({contents: this.sortByRecent(response)})})
                      }
            });
        findAllContent().then(contents => this.setState({allContents:this.sortByRecent(contents)}));
    }

    sortByRecent = (activities) => {
        for (const act in activities) {
            activities[act].creationDate = new Date(activities[act].creationDate);
        }
        const sorted = activities.sort((a,b) => b.creationDate - a.creationDate);
        return sorted;
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
                    <div className="wbdv-wordly-happenings-section">
                        <h3>Sitewide Recent Activity</h3>
                        <ol>
                            {this.state.allContents && this.state.allContents < 1 &&
                             <p>No recent activity.</p>
                            }
                            {this.state.allContents && this.state.allContents.map(content =>
                                <div key={content.contentId}>
                                    {content.contentType === "QUOTATION" &&
                                     <li className="wbdv-activity-details">
                                         User posted a new quote-- "{content.text}".
                                     </li>}
                                    {content.contentType === "SENTENCE" &&
                                     <li className="wbdv-activity-details">
                                         User posted a new sentence-- "{content.text}".
                                     </li>}
                                    {content.contentType === "DEFINITION" &&
                                     <li className="wbdv-activity-details">
                                         User posted a new definition-- "{content.text}".
                                     </li>}
                                    {content.contentType === "COMMENT" &&
                                     <li className="wbdv-activity-details">
                                         User posted a new definition-- "{content.text}".
                                     </li>}
                                </div>
                            )}
                        </ol>
                    </div>
                </div>

                {/* PERSONAL STATS - VIEWABLE ONLY TO LOGGED IN USER */}
                {this.state.profile.userType !== "PUBLIC" &&
                 <div className="parallax" id="wbdv-personal-stats">
                     <h2 className="section-title">&middot; PERSONAL AFFAIRS &middot;</h2>
                     <br/>
                     <div className="wbdv-wordly-happenings-section">
                         <h3>Recently Liked Words</h3>
                         <ol>
                             {this.state.contents && this.state.contents < 1 &&
                              <p>No recent activity.</p>
                             }
                             {this.state.contents && this.state.contents.map(content =>
                                   <div key={content.contentId}>
                                       {content.contentType === "QUOTATION" &&
                                        <li className="wbdv-activity-details">
                                            You posted a new quote-- "{content.text}".
                                        </li>}
                                       {content.contentType === "SENTENCE" &&
                                        <li className="wbdv-activity-details">
                                            You posted a new sentence-- "{content.text}".
                                        </li>}
                                       {content.contentType === "DEFINITION" &&
                                        <li className="wbdv-activity-details">
                                            You posted a new definition-- "{content.text}".
                                        </li>}
                                       {content.contentType === "COMMENT" &&
                                        <li className="wbdv-activity-details">
                                            You posted a new definition-- "{content.text}".
                                        </li>}
                                   </div>
                             )}
                         </ol>
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
