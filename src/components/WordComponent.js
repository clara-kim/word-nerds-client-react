import React from "react";
import "./WordComponent.css"
import Tab from 'react-bootstrap/Tabs'
import Tabs from 'react-bootstrap/Tabs'
import {getWordDetails} from "../services/DictionaryService";
import QuoteComponent from "./WordDetails/QuoteComponent"
import SentenceComponent from "./WordDetails/SentenceComponent";
import CommentComponent from "./WordDetails/CommentComponent";
import DefinitionComponent from "./WordDetails/DefinitionComponent";

/*
This is the word component that includes all content about a particular word.
 */
class WordComponent extends React.Component {

    state = {
        wordData: [],
        definition:[],
        likes: 46,
        dislikes: 2,
        newQuote: "",
        newBook: "",
        newAuthor: "",
        newSentence: "",
        newComment: "",
        newDefinition: ""
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

    addContent (type) {
        if (this.props.profile.userType === "PUBLIC"){
            alert("You must be logged in to perform this action!")
        } else if (type === "QUOTE") {
            if (this.state.newBook === "" || this.state.newAuthor === "" || this.state.newQuote === "") {
                alert("Please fill in all fields and try again!")
            } else {
                //console.log(this.state.newBook + this.state.newAuthor + this.state.newQuote);
                this.setState({newBook: "", newAuthor: "", newQuote: ""});
                // CALL ADD SERVICE CONTENT
            }
        } else if (type === "SENTENCE") {
            if (this.state.newSentence === "") {
                alert("Please fill in the field and try again!")
            } else {
                //console.log(this.state.newSentence);
                this.setState({newSentence: ""})
                // CALL ADD SERVICE CONTENT
            }
        } else if (type === "COMMENT") {
            if (this.state.newComment === "") {
                alert("Please fill in the field and try again!")
            } else {
                //console.log(this.state.newComment);
                this.setState({newComment: ""})
                // CALL ADD SERVICE CONTENT
            }
        } else if (type === "DEFINITION") {
            if (this.state.newComment === "") {
                alert("Please fill in the field and try again!")
            } else {
                //console.log(this.state.newDefinition);
                this.setState({newDefinition: ""})
                // CALL ADD SERVICE CONTENT
            }
        }
    }

    render () {
        return (
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
                </div>

                {/*TABS SECTION*/}
                <div className="wbdv-tabs-section">
                    <Tabs defaultActiveKey="quotes" id="uncontrolled-tab-example"
                          className="wbdv-tabs">

                        {/*QUOTES TAB*/}
                        <Tab eventKey="quotes" title="Quotes" className="wbdv-tab">
                            <QuoteComponent profile={this.props.profile}/>
                            <QuoteComponent profile={this.props.profile}/>
                            <div className="wbdv-input-div container">
                                <textarea className="container wbdv-input-data" title="Quote"
                                          placeholder="Add a new quote here..." value={this.state.newQuote}
                                          onChange={(e) => this.setState({newQuote: e.target.value})}/>
                                <input type="text" className="container wbdv-input-data" title="Book"
                                          placeholder="Add quote's book here..." value={this.state.newBook}
                                          onChange={(e) => this.setState({newBook: e.target.value})}/>
                                <input type="text" className="container wbdv-input-data" title="Author"
                                       placeholder="Add quote's author here..." value={this.state.newAuthor}
                                       onChange={(e) => this.setState({newAuthor: e.target.value})}/>
                                <button className="container btn btn-success"
                                        onClick={() => this.addContent("QUOTE")}>
                                    Add New Quote
                                </button>
                            </div>
                        </Tab>

                        {/*EXAMPLE SENTENCES TAB*/}
                        <Tab eventKey="examples" title="Example Sentences">
                            <SentenceComponent profile={this.props.profile}/>
                            <div className="wbdv-input-div container">
                                <textarea className="container wbdv-input-data" title="Sentence"
                                          placeholder="Add a new sentence here..." value={this.state.newSentence}
                                          onChange={(e) => this.setState({newSentence: e.target.value})}/>
                                <button className="container btn btn-success"
                                        onClick={() => this.addContent("SENTENCE")}>
                                    Add New Sentence
                                </button>
                            </div>
                        </Tab>

                        {/*COMMENTS TAB*/}
                        <Tab eventKey="comments" title="Comments">
                            <CommentComponent profile={this.props.profile}/>
                            <div className="wbdv-input-div container">
                                <textarea className="container wbdv-input-data" title="Comment"
                                          placeholder="Add a new comment here..." value={this.state.newComment}
                                          onChange={(e) => this.setState({newComment: e.target.value})}/>
                                <button className="container btn btn-success"
                                        onClick={() => this.addContent("COMMENT")}>
                                    Add New Comment
                                </button>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default WordComponent
