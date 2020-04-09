import React from "react";
import "./WordComponent.css"
import Tab from 'react-bootstrap/Tabs'
import Tabs from 'react-bootstrap/Tabs'
import {getWordDetails} from "../services/DictionaryService";
import {getSearchResults} from "../services/SearchService";
import QuoteComponent from "./WordDetails/QuoteComponent"
import SentenceComponent from "./WordDetails/SentenceComponent";
import CommentComponent from "./WordDetails/CommentComponent";
import DefinitionComponent from "./WordDetails/DefinitionComponent";

/*
This is the word component that includes all details about a particular word.
Currently, it only displays the definition.
In the implementation, it will also include likes, comments, example sentences, quotes, etc.
 */
class WordComponent extends React.Component {

    state = {
        wordData: [],
        likes: 46,
        dislikes: 2
    }

    // For some reason, can only access one level down of the word JSON.
    // We can implement wordData structure properly when we build the server
    // Short def located at wordData[0].shortdef[0]
    getWordDef = () => {
        return this.state.wordData.shortdef
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
        this.setState({wordData: wordData})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.word !== this.props.word) {
            getWordDetails(this.props.word)
                .then(result => this.setState({wordData: result[0]}))
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
                    <div className="word-definition">
                        <p>
                            {this.getWordDef()}
                            <br/>
                            <br/>
                            <span className="float-right wbdv-mw"> Merriam-Webster Dictionary </span>
                        </p>
                    </div>
                </div>

                {/*TABS SECTION*/}
                <div className="wbdv-tabs-section">
                    <Tabs defaultActiveKey="quotes" id="uncontrolled-tab-example"
                          className="wbdv-tabs">

                        {/*QUOTES TAB*/}
                        <Tab eventKey="quotes" title="Quotes" className="wbdv-tab">
                            {this.props.profile.userType !== "PUBLIC" &&
                             <button className="float-left btn btn-info wbdv-add-button">Add New</button>}
                            <QuoteComponent profile={this.props.profile}/>
                            <QuoteComponent profile={this.props.profile}/>
                        </Tab>

                        {/*EXAMPLE SENTENCES TAB*/}
                        <Tab eventKey="examples" title="Example Sentences">
                            {this.props.profile.userType !== "PUBLIC" &&
                             <button className="float-left btn btn-info wbdv-add-button">Add New</button>}
                            <SentenceComponent profile={this.props.profile}/>
                        </Tab>

                        {/*COMMENTS TAB*/}
                        <Tab eventKey="comments" title="Comments">
                            {this.props.profile.userType !== "PUBLIC" &&
                             <button className="float-left btn btn-info wbdv-add-button">Add New</button>}
                            <CommentComponent profile={this.props.profile}/>
                        </Tab>

                        {/*DEFINITION TAB*/}
                        <Tab eventKey="definitions" title="User-Uploaded Definitions">
                            {this.props.profile.userType !== "PUBLIC" &&
                             <button className="float-left btn btn-info wbdv-add-button">Add New</button>}
                            <DefinitionComponent profile={this.props.profile}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default WordComponent
