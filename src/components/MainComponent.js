import React from "react";
import "./main.css"
import LandingComponent from "./LandingComponent"
import SearchResultsComponent from "./SearchResultsComponent"
import WordComponent from "./WordComponent"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginComponent from "./LoginComponent";
import ProfileComponent from "./ProfileComponent";
import RegisterComponent from "./RegisterComponent";

/*
This is the main component in which the Router is contained.
The navbar is currently displayed across all components.
 */
class MainComponent extends React.Component {

    state = {
        searchField: "", // string in the search field
    }

    // Updates searchField when user types in the search field
    updateSearch = (e) =>
        this.setState({searchField: e.target.value})


    clearSearch = () => {
        this.setState({searchField: ""})
    }

    render () {
        return (
            <Router>

                {/* Navigation bar displayed across all pages*/}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                    {/* Word Nerds logo in navbar-- brings user back to home */}
                    <Link to="/" className="navbar-brand" href="#">
                        <i className="fa fa-book-open"></i>
                        Word Nerds
                    </Link>

                    {/* Search field in navbar */}
                    <form className="form-inline">
                        <input className="form-control mr-sm-0" type="search"
                               placeholder="Search for a word!" value={this.state.searchField}
                               onChange={this.updateSearch}/>
                        <Link to={`/search/${this.state.searchField}`}
                              onClick={this.clearSearch}>
                            <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </Link>
                    </form>

                    {/*<Link to="/login" href="#" className="float-right">*/}
                        {/*<i className="fa fa-sign-in"*/}
                           {/*title="Sign In"></i>*/}
                    {/*</Link>*/}
                </nav>

                {/* Home/landing component -- displays word of the day and daily stats */}
                <Route
                    path="/"
                    exact={true}
                    render={() =>
                        <LandingComponent/>
                    }/>

                {/* Login component -- login page */}
                <Route
                    path="/login"
                    exact={true}
                    component={LoginComponent}/>

                {/* Profile component -- user's profile page */}
                <Route
                    path="/profile"
                    exact={true}
                    render={() =>
                        <ProfileComponent/>
                    }/>

                {/* Profile component -- user's profile page */}
                <Route
                    path="/register"
                    exact={true}
                    component={RegisterComponent}/>

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
                            word={props.match.params.word}/>
                    }/>

            </Router>
        )
    }
}
export default MainComponent
