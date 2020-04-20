import React from "react";
import "./WordComponent.css"
import Tab from 'react-bootstrap/Tabs'
import Tabs from 'react-bootstrap/Tabs'
import {getWordDetails} from "../services/DictionaryService";
import SentenceComponent from "./WordDetails/SentenceComponent";
import CommentComponent from "./WordDetails/CommentComponent";
import DefinitionComponent from "./WordDetails/DefinitionComponent";
import {Provider} from 'react-redux'
import quoteReducer from "../reducers/quoteReducer";
import {combineReducers, createStore} from 'redux';
import QuoteComponent from "./WordDetails/QuoteComponent";
import QuoteInputComponent from "./WordDetails/QuoteInputComponent";
import CommentInputComponent from "./WordDetails/CommentInputComponent";
import SentenceInputComponent from "./WordDetails/SentenceInputComponent";
import DefinitionInputComponent from "./WordDetails/DefinitionInputComponent";

const rootReducer = combineReducers({
                                        quotes: quoteReducer
                                    })

const store = createStore (rootReducer);

/*
This is the word component that includes all content about a particular word.
 */
class WordComponent extends React.Component {

    state = {
        wordData: [],
        definition:[],
        likes: 46,
        dislikes: 2,
    }

    // IF NOT SIGNED IN, CLICKING LIKE OR DISLIKE OPENS POP-UP
    increaseLike = () => {
        if (this.props.profile.userType === "PUBLIC") {
            alert("You must be logged in to perform this action!")
        }
        else {
            this.setState({likes: this.state.likes + 1})
        }
    }

    increaseDislike = () => {
        if (this.props.profile.userType === "PUBLIC") {
            alert("You must be logged in to perform this action!")
        }
        else {
            this.setState({dislikes: this.state.dislikes + 1})
        }
    }

    componentDidMount = async() => {
        const wordData = await getWordDetails(this.props.word)
        this.setState({wordData: wordData});
        this.setState({definition: wordData.shortdef})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.word !== this.props.word) {
            getWordDetails(this.props.word)
                .then(result => this.setState({wordData: result[0]}))
        }
    }

    render () {
        return (
            <Provider store={store}>
                <div className="word-description-page">

                    {/*SECTION WITH WORD AND DEFINITION*/}
                    <div className="container">
                        <h1 className="wbdv-word-title-section">

                            {/*WORD TITLE*/}
                            <span className="wbdv-word-title">
                                {this.props.word}
                            </span>

                            {/*WORD THUMBS UP AND THUMBS DOWN*/}
                            <span className="wbdv-word-thumbs">

                                {/*THUMBS UP*/}
                                <button className="wbdv-transparent-button"
                                        onClick={ () => this.increaseLike()}>
                                    <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                       title="like"/>
                                    <br/>
                                    <span className="wbdv-word-like-number">
                                        {this.state.likes}
                                    </span>
                                </button>

                                {/*THUMBS DOWN*/}
                                <button className="wbdv-transparent-button"
                                        onClick={ () => this.increaseDislike()}>
                                    <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                       title="dislike"/>
                                    <br/>
                                    <span className="wbdv-word-dislike-number">
                                        {this.state.dislikes}
                                    </span>
                                </button>
                            </span>
                        </h1>

                        {/*WORD DEFINITION*/}
                        {this.state.definition && this.state.definition.map( (def, index) =>
                        <div className="word-definition" key={index}>
                            <p className="wbdv-tab-data-input">{def}</p>
                            <p className="wbdv-tab-data-user"> Merriam-Webster Dictionary </p>
                        </div>
                        )}

                        <DefinitionComponent profile={this.props.profile}/>
                        <DefinitionInputComponent profile={this.props.profile}/>
                    </div>

                    {/*TABS SECTION*/}
                    <div className="wbdv-tabs-section">
                        <Tabs defaultActiveKey="quotes" id="uncontrolled-tab-example"
                              className="wbdv-tabs">

                            {/*QUOTES TAB*/}
                            <Tab eventKey="quotes" title="Quotes" className="wbdv-tab">
                                {/*TODO add MAP for each quote*/}
                                <QuoteComponent profile={this.props.profile}/>
                                <QuoteInputComponent profile={this.props.profile}/>
                            </Tab>

                            {/*EXAMPLE SENTENCES TAB*/}
                            <Tab eventKey="examples" title="Example Sentences">
                                <SentenceComponent profile={this.props.profile}/>
                                <SentenceInputComponent profile={this.props.profile}/>
                            </Tab>

                            {/*COMMENTS TAB*/}
                            <Tab eventKey="comments" title="Comments">
                                <CommentComponent profile={this.props.profile}/>
                                <CommentInputComponent profile={this.props.profile}/>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </Provider>
        )
    }
}

export default WordComponent
