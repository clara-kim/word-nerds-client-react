import React from "react"
import {Link} from "react-router-dom";
import {getSearchResults} from "../services/SearchService";
import "./SearchResultsComponent.css"

/*
    The search results component which displays the search results.

    The search page and the word details page use different APIs.
    The search page uses the DataMuse API, which is useful for looking up words (eg. accounts for typos).
    The word details page uses Merriam Webster for its depth of information.
     */
class SearchResultsComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        words: []
    }

    componentDidMount = async() => {
        const searchResults = await getSearchResults(this.props.searched)
        this.setState({words: searchResults})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.searched !== this.props.searched) {
            getSearchResults(this.props.searched)
                .then(searchResults => this.setState({words: searchResults}))
        }
    }

    render() {
        return (
            <div className="search-results-page">
                <div className="container">

                    {/* Display all search results */}
                    {this.state.words.length > 0 &&
                     this.state.words.map( (item, index) =>
                        <div className="search-result-item" key={index}>
                            <Link to={`/word/${item}`}>
                                <h4 className="wbdv-white-font">{item}</h4>
                            </Link>
                        </div>)}

                    {/* Display message if no results found. */}
                    {this.state.words.length < 1 &&
                     <div className="search-result-item">
                            <h4 className="wbdv-white-font">Alas, your query yields a dearth of results.</h4>
                    </div>}
                </div>
            </div>
        )
    }
}

export default SearchResultsComponent
