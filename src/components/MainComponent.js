import React from "react";
import "./main.css"
import LandingComponent from "./LandingComponent"
import SearchResultsComponent from "./SearchResultsComponent"
import WordComponent from "./WordComponent"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginComponent from "./LoginComponent";
import ProfileComponent from "./ProfileComponent";
import RegisterComponent from "./RegisterComponent";
import {profile} from "../services/UserService"
import PrivacyPolicyComponent from "./PrivacyPolicyComponent";
import ProfileViewOnlyComponent from "./ProfileViewOnlyComponent";

/*
This is the main component in which the Router is contained.
The navbar is currently displayed across all components.
 */
class MainComponent extends React.Component {

    constructor(props){
        super(props)

        this.updateUser = this.updateUser.bind(this)
    }

    state = {
        searchField: "", // string in the search field
        profile: { // user information (if user is logged in)
            userId: 0,
            username: '',
            //password: '', TODO DELETE IF UNNECESSARY
            firstName: '',
            lastName: '',
            email: '',
            userType: "PUBLIC"
        }
    }

    updateUser() {
        profile()
            .then(profile =>
                      this.setState({profile: profile}))
    }

    // Clears searchField (called when word is searched)
    clearSearch = () => {
        this.setState({searchField: ""})
    }

    // Requests user information upon component mount.
    // Content displayed is user-specific.
    componentDidMount(){
        profile()
            .then(profile =>
                  this.setState({profile: profile}))
    }

    render () {
        return (
            <Router>

                {/* Navigation bar displayed across all pages*/}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="row col-10">
                        {/* Word Nerds logo in navbar-- brings user back to home */}
                        <Link to="/" className="navbar-brand" href="#">
                            <i className="fa fa-book-open"></i>
                            Word Nerds
                        </Link>

                        {/* Search field in navbar */}
                        <form className="form-inline">
                            <input className="form-control mr-xxs-0 col-8" type="search"
                                   placeholder="Search for a word!" value={this.state.searchField}
                                   onChange={(e) => this.setState({searchField: e.target.value})}/>
                            <Link to={`/search/${this.state.searchField}`}
                                  onClick={this.clearSearch} className="">
                                <button className="btn btn-outline-secondary my-sm-0 wbdv-navbar-button"
                                        type="submit">
                                    <i className="fa fa-search"></i>
                                </button>
                            </Link>
                        </form>
                    </div>

                    <div className="col-2 wbdv-navbar-right">
                        {/*Login button (displayed if user is not logged in)*/}
                        {this.state.profile.userType === "PUBLIC" &&
                         <Link to="/login" href="#">
                             <button className="btn btn-outline-secondary wbdv-navbar-button"
                                     type="submit" title="Sign In">
                                 <i className="fa fa-sign-in"
                                    title="Sign In"></i>
                                 &nbsp; Log In
                             </button>
                         </Link> }
                         {/*Go to Profile button (displayed if user is logged in)*/}
                        {this.state.profile.userType !== "PUBLIC" &&
                         <Link to="/profile" href="#">
                             <button className="btn btn-outline-secondary wbdv-navbar-button"
                                     type="submit" title="Go to My Profile">
                                 <i className="fa fa-user"
                                    title="Go to My Profile"></i>
                                 &nbsp; Profile
                             </button>
                         </Link>}
                    </div>
                </nav>

                {/* Home/landing component -- displays word of the day and daily stats */}
                <Route
                    path="/"
                    exact={true}
                    component={LandingComponent}/>

                {/* Login component -- login page */}
                <Route
                    path="/login"
                    exact={true}
                    render={(props) => <LoginComponent {...props} updateUser={this.updateUser}/>}/>

                {/* Profile component -- user's profile page */}
                <Route
                    path="/profile"
                    exact={true}
                    render={(props) => <ProfileComponent {...props} updateUser={this.updateUser}/>}/>

                {/* Profile component -- viewing another user's profile page */}
                <Route
                    path="/profile/:userId"
                    exact={true}
                    render={(props) =>
                        <ProfileViewOnlyComponent
                            {...props}
                            profile = {this.state.profile}
                            viewUserId={props.match.params.userId}/>
                    }/>

                {/* Profile component -- user's profile page */}
                <Route
                    path="/register"
                    exact={true}
                    component={RegisterComponent}/>

                {/* Profile component -- user's profile page */}
                <Route
                    path="/privacy-policy"
                    exact={true}
                    render = {() => <PrivacyPolicyComponent/>}/>

                {/* Search results component -- displays search results */}
                <Route
                    path="/search/:searched"
                    exact={true}
                    render={(props) =>
                        <SearchResultsComponent
                            searched={props.match.params.searched}
                            clearSearch = {this.clearSearch}/>
                    }/>

                {/* Word components -- displays a word's details */}
                <Route
                    path="/word/:word"
                    exact={true}
                    render={(props) =>
                        <WordComponent
                            word={props.match.params.word}
                            profile={this.state.profile}/>
                    }/>

            </Router>
        )
    }
}
export default MainComponent
