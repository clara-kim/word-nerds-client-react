import React from "react";
import "./PrivacyPolicyComponent.css";

const PrivacyPolicyComponent = () =>
    <div className="wbdv-privacy-policy ">
        <h1 id="wbdv-privacy-heading">Word Nerds Privacy Policy</h1>
        <br/>
        <h3>The Context of Word Nerds</h3>
        <p>
            Word Nerds is a community dictionary where users personally engage with words and
            enhance them with meaningful human input (eg. example sentences, word ratings,
            region-specific definitions).
        </p>
        <p>
            Our goals are:
            <ol>
                <li>To attach &nbsp;
                    <span className="wbdv-underline">
                         meaningful human insight
                    </span>
                    &nbsp; to words in the English dictionary</li>
                <li>For users to have a sense of &nbsp;
                    <span className="wbdv-underline">contribution</span>
                    &nbsp; to and &nbsp;
                    <span className="wbdv-underline">ownership</span>
                    &nbsp; over the English
                    language as well as content on the site</li>
                <li>To build a &nbsp;
                    <span className="wbdv-underline">community</span>
                    &nbsp; where users can expand their word engagement by observing
                    other users’ actions</li>
            </ol>
        </p>
        <br/>
        <h3>Data Collection, Use, and Justification of Use*</h3>
        <h5>
            <span className="wbdv-underline">User Information</span>
            <span className="wbdv-policy-note"> (identifying information about the user)</span>
        </h5>
        <ol>
            <li>
                For identification and authentication purposes, the user’s username, password
                (encrypted), and date of registering as a user will be saved. This information will
                be used to allow a user to log in and contribute to the site.
            </li>
            <li>
                For contact purposes between users, the user’s first name, last name, and email
                will be saved if the user chooses to volunteer this information. This information
                would be displayed on the user’s profile solely for other users to contact them if
                they desire. We hope that this would nurture communication in the community as there
                is no built-in messaging system at this time. Word Nerds will never contact the
                user directly using this information.
            </li>
        </ol>
        <br/>
        <h5>
            <span className="wbdv-underline">User Actions</span>
            <span className="wbdv-policy-note"> (explicit actions/contributions the user has made to the site)</span>
        </h5>
        <ol>
            <li>
                When a user contributes a comment, definition, example sentence, quote, or rating,
                the details about the action are saved, such as which word was commented on, which
                user was followed, the contents of the sentence, etc. These contributions are saved
                for display on the site. They are also saved so that the user can refer back to
                their old posts, offering a stronger sense of ownership over their contributions.
            </li>
            <li>
                When a user follows another user, this action is recorded so a user can “remember”
                who they have chosen to follow. This will allow the user to see these users’
                contributions and expand their exposure to new words.
            </li>
        </ol>
    </div>


export default PrivacyPolicyComponent;
