import React from "react";
import "./WordComponent.css"
import {getWordDetails} from "../services/DictionaryService";
import {Provider} from 'react-redux'
import quoteReducer from "../reducers/quoteReducer";
import {combineReducers, createStore} from 'redux';
import ContentSectionComponent from "./WordDetails/ContentSectionComponent";
import DefinitionSectionComponent from "./WordDetails/DefinitionSectionComponent";
import {getDislikeNumberForWord, getLikeNumberForWord} from "../services/wordService"
import definitionReducer from "../reducers/definitionReducer";
import sentenceReducer from "../reducers/sentenceReducer";
import commentReducer from "../reducers/commentReducer";

const rootReducer = combineReducers({
                                        quotes: quoteReducer,
                                        definitions: definitionReducer,
                                        sentences: sentenceReducer,
                                        comments: commentReducer
                                    })

const store = createStore (rootReducer);

/*
This is the word component that includes all content about a particular word.
 */
class WordComponent extends React.Component {

    state = {
        wordData: [],
        definition:[],
        likes: 0,
        dislikes: 0,
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
        const wordData = await getWordDetails(this.props.word);
        this.setState({wordData: wordData});
        this.setState({definition: wordData.shortdef});
        const likes = await getLikeNumberForWord(this.props.word);
        const dislikes = await getDislikeNumberForWord(this.props.word);
        this.setState({likes: likes});
        this.setState({dislikes: dislikes});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.word !== this.props.word) {
            getWordDetails(this.props.word)
                .then(result => this.setState({wordData: result[0]}));
            getLikeNumberForWord(this.props.word)
                .then(result => this.setState({likes: result}));
            getDislikeNumberForWord(this.props.word)
                .then(result => this.setState({dislikes: result}));
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

                        <DefinitionSectionComponent
                            profile={this.props.profile}
                            word={this.props.word}
                        />
                    </div>

                    {/*TABS SECTION*/}
                    <ContentSectionComponent
                        profile={this.props.profile}
                        word={this.props.word}
                    />
                </div>
            </Provider>
        )
    }
}

export default WordComponent
