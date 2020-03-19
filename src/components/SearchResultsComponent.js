import React from "react"
import {Link} from "react-router-dom";


/*
    The search page and the word details page use different APIs.
    The search page uses the DataMuse API, which is useful for looking up words (eg. accounts for typos).
    The word details page uses Merriam Webster for its depth of information.

    The DataMuse API yields many nonexistent words, however.
    In the actual implementation, we will cross-reference each word in the DataMuse search
    with the Merriam Webster API in order to confirm that only real words are displayed in the search results page.
     */
class SearchResultsComponent extends React.Component {

    state = {
        words: []
    }

    componentDidMount() {
        // https://cors-anywhere.herokuapp.com/ is a CORS proxy for getting around
        // "No Access-Control-Allow-Origin header" problems
        // see https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `http://api.datamuse.com/words?sp=${this.props.searched}*&md=d`
        fetch (proxyurl + url)
            .then(response =>response.json())
            .then(results => this.setState({words: results}))
            // .then(result => this.filterWords())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.searched !== this.props.searched) {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = `http://api.datamuse.com/words?sp=${this.props.searched}&md=d`
            fetch (proxyurl + url)
                .then(response =>response.json())
                .then(results => this.setState({words: results}))
                // .then(result => this.filterWords())
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
