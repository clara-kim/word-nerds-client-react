import React from "react";
import "./WordComponent.css"
import {getWordDetails} from "../services/DictionaryService";
import {Provider} from 'react-redux'
import quoteReducer from "../reducers/quoteReducer";
import {combineReducers, createStore} from 'redux';
import ContentSectionComponent from "./WordDetails/ContentSectionComponent";
import DefinitionSectionComponent from "./WordDetails/DefinitionSectionComponent";
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
    }

    componentDidMount = async() => {
        const wordData = await getWordDetails(this.props.word);
        this.setState({wordData: wordData});
        this.setState({definition: wordData.shortdef});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.word !== this.props.word) {
            getWordDetails(this.props.word)
                .then(result => this.setState({wordData: result[0]}));
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
