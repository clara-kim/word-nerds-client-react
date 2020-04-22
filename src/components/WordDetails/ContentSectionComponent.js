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
import ContentService from "../../services/ContentService"
import {
    CREATE_SENTENCE,
    DELETE_SENTENCE,
    FIND_SENTENCES_FOR_WORD, UPDATE_SENTENCE
} from "../../actions/sentenceAction";
import {CREATE_COMMENT, DELETE_COMMENT, FIND_COMMENTS_FOR_WORD} from "../../actions/commentAction";

class ContentSectionComponent extends React.Component {

    componentDidMount() {
        this.props.findQuotesForWord(this.props.word);
        this.props.findSentencesForWord(this.props.word);
        this.props.findCommentsForWord(this.props.word);
    }

    render () {
        return (
            <div className="wbdv-tabs-section">
                <Tabs defaultActiveKey="quotes" id="uncontrolled-tab-example"
                      className="wbdv-tabs">

                    {/*QUOTES TAB*/}
                    <Tab eventKey="quotes" title="Quotes" className="wbdv-tab">
                        {this.props.quotes && this.props.quotes.map(content =>
                            <QuoteComponent
                                profile={this.props.profile}
                                content = {content}
                                key={content.contentId}
                                deleteQuote = {this.props.deleteQuote}
                                updateQuote = {this.props.updateQuote}
                            />
                        )}
                        <QuoteInputComponent
                            profile={this.props.profile}
                            word={this.props.word}
                            createQuote = {this.props.createQuote}
                        />
                    </Tab>

                    {/*EXAMPLE SENTENCES TAB*/}
                    <Tab eventKey="examples" title="Example Sentences">
                        {this.props.sentences && this.props.sentences.map(content =>
                            <SentenceComponent
                                profile={this.props.profile}
                                content = {content}
                                key={content.contentId}
                                deleteSentence = {this.props.deleteSentence}
                                updateSentence = {this.props.updateSentence}
                            />
                        )}
                        <SentenceInputComponent
                            profile={this.props.profile}
                            word={this.props.word}
                            createSentence = {this.props.createSentence}
                        />
                    </Tab>

                    {/*COMMENTS TAB*/}
                    <Tab eventKey="comments" title="Comments">
                        {this.props.comments && this.props.comments.map(content =>
                        <CommentComponent
                            profile={this.props.profile}
                            content = {content}
                            key={content.contentId}
                            deleteComment = {this.props.deleteComment}
                            updateComment = {this.props.updateComment}
                        />
                        )}
                        <CommentInputComponent
                            profile={this.props.profile}
                            word={this.props.word}
                            createComment = {this.props.createComment}
                        />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        quotes: state.quotes.quotes,
        comments: state.comments.comments,
        sentences: state.sentences.sentences
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findQuotesForWord: (word) =>
            ContentService.findQuotesForWord(word)
                .then(actualQuotes => dispatch({
                                                    type: FIND_QUOTES_FOR_WORD,
                                                    quotes: actualQuotes
                                                })),
        findCommentsForWord: (word) =>
            ContentService.findCommentsForWord(word)
                .then(actualComments => dispatch({
                                                   type: FIND_COMMENTS_FOR_WORD,
                                                   comments: actualComments
                                               })),
        findSentencesForWord: (word) =>
            ContentService.findSentencesForWord(word)
                .then(actualSentences => dispatch({
                                                   type: FIND_SENTENCES_FOR_WORD,
                                                   sentences: actualSentences
                                               })),
        deleteQuote: (contentId) =>
            ContentService.deleteContent(contentId)
                .then(status =>
                          dispatch({
                                       type: DELETE_QUOTE,
                                       contentId: contentId
                                   })
                ),
        deleteSentence: (contentId) =>
            ContentService.deleteContent(contentId)
                .then(status =>
                          dispatch({
                                       type: DELETE_SENTENCE,
                                       contentId: contentId
                                   })
                ),
        deleteComment: (contentId) =>
            ContentService.deleteContent(contentId)
                .then(status =>
                          dispatch({
                                       type: DELETE_COMMENT,
                                       contentId: contentId
                                   })
                ),
        createQuote: (newQuote, userId, word) =>
             ContentService.createContent(newQuote, userId, word)
                 .then(actualQuote =>
                          dispatch({
                                       type: CREATE_QUOTE,
                                       newQuote: actualQuote
                                   })
        ),
        createSentence: (newSentence, userId, word) =>
            ContentService.createContent(newSentence, userId, word)
                .then(actualSentence =>
                          dispatch({
                                       type: CREATE_SENTENCE,
                                       newSentence: actualSentence
                                   })
                ),
        createComment: (newComment, userId, word) =>
            ContentService.createContent(newComment, userId, word)
                .then(actualComment =>
                          dispatch({
                                       type: CREATE_COMMENT,
                                       newComment: actualComment
                                   })
                ),
        updateQuote: (contentId, quote) =>
            ContentService.updateContent(contentId, quote)
                .then(quote =>
                          dispatch({
                                       type: UPDATE_QUOTE,
                                       updatedQuote: quote
                                   })
                ),
        updateSentence: (contentId, sentence) =>
            ContentService.updateContent(contentId, sentence)
                .then(sentence =>
                          dispatch({
                                       type: UPDATE_SENTENCE,
                                       updatedSentence: sentence
                                   })
                ),
        updateComment: (contentId, comment) =>
            ContentService.updateContent(contentId, comment)
                .then(comment =>
                          dispatch({
                                       type: UPDATE_SENTENCE,
                                       updatedComment: comment
                                   })
                )
    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper) (ContentSectionComponent)
