import React from "react";
import "../WordComponent.css"
import Tab from 'react-bootstrap/Tabs'
import Tabs from 'react-bootstrap/Tabs'
import SentenceComponent from "./SentenceComponent";
import CommentComponent from "./CommentComponent";
import QuoteComponent from "./QuoteComponent";
import QuoteInputComponent from "./QuoteInputComponent";
import CommentInputComponent from "./CommentInputComponent";
import SentenceInputComponent from "./SentenceInputComponent";
import {connect} from "react-redux";
import {
    CREATE_QUOTE,
    DELETE_QUOTE,
    FIND_QUOTES_FOR_WORD,
    UPDATE_QUOTE
} from "../../actions/quoteAction";
import QuoteService from "../../services/QuoteService"

class ContentSectionComponent extends React.Component {

    // componentDidMount() {
    //     this.props.findQuotesForWord(this.props.word)
    // }

    render () {
        return (
            <div className="wbdv-tabs-section">
                <Tabs defaultActiveKey="quotes" id="uncontrolled-tab-example"
                      className="wbdv-tabs">

                    {/*QUOTES TAB*/}
                    <Tab eventKey="quotes" title="Quotes" className="wbdv-tab">
                        {/*TODO add MAP for each quote*/}
                        <QuoteComponent profile={this.props.profile}/>
                        <QuoteInputComponent
                            profile={this.props.profile}
                            word={this.props.word}
                        />
                    </Tab>

                    {/*EXAMPLE SENTENCES TAB*/}
                    <Tab eventKey="examples" title="Example Sentences">
                        <SentenceComponent profile={this.props.profile}/>
                        <SentenceInputComponent
                            profile={this.props.profile}
                            word={this.props.word}
                        />
                    </Tab>

                    {/*COMMENTS TAB*/}
                    <Tab eventKey="comments" title="Comments">
                        <CommentComponent profile={this.props.profile}/>
                        <CommentInputComponent
                            profile={this.props.profile}
                            word={this.props.word}
                        />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        quotes: state.quotes.quotes
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        // findQuotesForWord: (word) =>
        //     QuoteService.findQuotesForWord(word)
        //         .then(actualQuotes => dispatch({
        //                                             type: FIND_QUOTES_FOR_WORD,
        //                                             quotes: actualQuotes
        //                                         })),
        // deleteQuote: (quoteId) =>
        //     QuoteService.deleteQuote(quoteId)
        //         .then(status =>
        //                   dispatch({
        //                                type: DELETE_QUOTE,
        //                                quoteId: quoteId
        //                            })),
        // createQuote: (word) => {
        //     QuoteService.createQuote(word)
        //         .then(actualQuote =>
        //                   dispatch({
        //                                type: CREATE_QUOTE,
        //                                newQuote: actualQuote
        //                            }))
        // },
        // updateQuote: (quoteId, quote) => {
        //     QuoteService.updateQuote(quoteId, quote)
        //         .then(quote =>
        //                   dispatch({
        //                                type: UPDATE_QUOTE,
        //                                updatedQuote: quote
        //                            })
        //         )
        // }
    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper) (ContentSectionComponent)
