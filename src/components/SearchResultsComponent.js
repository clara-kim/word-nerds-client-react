import React from "react"
import {Link} from "react-router-dom";
import {getSearchResults} from "../services/SearchService";

/*
    The search page and the word details page use different APIs.
    The search page uses the DataMuse API, which is useful for looking up words (eg. accounts for typos).
    The word details page uses Merriam Webster for its depth of information.

    The DataMuse API yields many nonexistent words, however.
    In the actual implementation, we will cross-reference each word in the DataMuse search
    with the Merriam Webster API in order to confirm that only real words are displayed in the search results page.
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

    /*
    For the time being, I filtered out words that do not have a definition in the DataMuse API
    in hopes that incorrect words are weeded out.
     */
    filterWords = () => {
        let i = 0;
        let filtered = []
        for (const word in this.state.words) {
            let wd = this.state.words[i]
            if (wd.defs !== undefined) {
                filtered.push(wd)
            }
            i++
        }
        this.setState({words: filtered})
    }

    render() {
        return (
            <div className="search-results-page">
                <div className="container">

                    {/* Display all search results */}
                    {this.state.words.length > 0 &&
                     this.state.words.map( (item, index) =>
                        <div className="search-result-item" key={index}>
                            <Link to={`/word/${item.word}`}>
                                <h4 className="wbdv-white-font">{item.word}</h4>
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
