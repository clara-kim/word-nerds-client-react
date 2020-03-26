import React from "react";
import "./WordComponent.css"
import Tab from 'react-bootstrap/Tabs'
import Tabs from 'react-bootstrap/Tabs'

/*
This is the word component that includes all details about a particular word.
Currently, it only displays the definition.
In the implementation, it will also include likes, comments, example sentences, quotes, etc.
 */
class WordComponent extends React.Component {

    state = {
        wordData: [],
        wordLikes: 46,
        wordDislikes: 2
    }

    // For some reason, can only access one level down of the word JSON.
    // We can implement wordData structure properly when we build the server
    // Short def located at wordData[0].shortdef[0]
    getWordDef = () => {
        return this.state.wordData.shortdef
    }

    // IF NOT SIGNED IN, CLICKING LIKE OR DISLIKE OPENS POP-UP
    // (eg. "Must sign in to execute this action")
    increaseLike = (likeType) => {
        if (likeType === "wordLikes") {
            this.setState ({wordLikes: this.state.wordLikes + 1})
        }
    }

    increaseDislike = (likeType) => {
        if (likeType === "wordDislikes") {
            this.setState ({wordDislikes: this.state.wordDislikes + 1})
        }
    }

    componentDidMount() {
        const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.props.word}?key=64a0dba8-3f3e-4b8f-8eef-e0e6e33247ee`
        fetch(url)
            .then(response => response.json())
            .then(result => this.setState({wordData: result[0]}))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.word !== this.props.word) {
            const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.props.word}?key=64a0dba8-3f3e-4b8f-8eef-e0e6e33247ee`
            fetch(url)
                .then(response => response.json())
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
                                    onClick={ () => this.increaseLike("wordLikes")}>
                                <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                   title="like"/>
                                <br/>
                                <span className="wbdv-word-like-number">
                                    {this.state.wordLikes}
                                </span>
                            </button>

                            {/*THUMBS DOWN*/}
                            <button className="wbdv-transparent-button"
                                    onClick={ () => this.increaseDislike("wordDislikes")}>
                                <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                   title="dislike"/>
                                <br/>
                                <span className="wbdv-word-dislike-number">
                                    {this.state.wordDislikes}
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
                            <div className="container wbdv-tab-data">

                                {/*THUMBS UP AND THUMBS DOWN*/}
                                <p className="wbdv-tab-thumbs">

                                    {/*THUMBS UP*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                           title="like"/>
                                        <br/>
                                        <span className="wbdv-word-like-number">
                                            10
                                        </span>
                                    </button>

                                    {/*THUMBS DOWN*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                           title="dislike"/>
                                        <br/>
                                        <span className="wbdv-word-dislike-number">
                                            1
                                        </span>
                                    </button>
                                </p>

                                {/*THE QUOTE*/}
                                <p className="wbdv-tab-data-input">A user-submitted quote would go here.</p>
                                <p className="wbdv-tab-data-user"> Book (Author) </p>
                                <p className="wbdv-tab-data-user"> Submitted by: User </p>
                            </div>

                            <div className="container wbdv-tab-data">

                                {/*THUMBS UP AND THUMBS DOWN*/}
                                <p className="wbdv-tab-thumbs">

                                    {/*THUMBS UP*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                           title="like"/>
                                        <br/>
                                        <span className="wbdv-word-like-number">
                                            10
                                        </span>
                                    </button>

                                    {/*THUMBS DOWN*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                           title="dislike"/>
                                        <br/>
                                        <span className="wbdv-word-dislike-number">
                                            1
                                        </span>
                                    </button>
                                </p>

                                {/*THE QUOTE*/}
                                <p className="wbdv-tab-data-input">A user-submitted quote would go here.</p>
                                <p className="wbdv-tab-data-user"> Book (Author) </p>
                                <p className="wbdv-tab-data-user"> Submitted by: User </p>
                            </div>
                        </Tab>

                        {/*EXAMPLE SENTENCES TAB*/}
                        <Tab eventKey="examples" title="Example Sentences">
                            <div className="container wbdv-tab-data">

                                {/*THUMBS UP AND THUMBS DOWN*/}
                                <p className="wbdv-tab-thumbs">

                                    {/*THUMBS UP*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                           title="like"/>
                                        <br/>
                                        <span className="wbdv-word-like-number">
                                            10
                                        </span>
                                    </button>

                                    {/*THUMBS DOWN*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                           title="dislike"/>
                                        <br/>
                                        <span className="wbdv-word-dislike-number">
                                            1
                                        </span>
                                    </button>
                                </p>

                                {/*THE SENTENCE*/}
                                <p className="wbdv-tab-data-input">A user-submitted sentence would go here.</p>
                                <p className="wbdv-tab-data-user"> Submitted by: User </p>
                            </div>

                            <div className="container wbdv-tab-data">
                                {/*THUMBS UP AND THUMBS DOWN*/}
                                <p className="wbdv-tab-thumbs">

                                    {/*THUMBS UP*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                           title="like"/>
                                        <br/>
                                        <span className="wbdv-word-like-number">
                                            10
                                        </span>
                                    </button>

                                    {/*THUMBS DOWN*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                           title="dislike"/>
                                        <br/>
                                        <span className="wbdv-word-dislike-number">
                                            1
                                        </span>
                                    </button>
                                </p>

                                {/*THE SENTENCE*/}
                                <p className="wbdv-tab-data-input">A user-submitted sentence would go here.</p>
                                <p className="wbdv-tab-data-user"> Submitted by: User </p>
                            </div>
                        </Tab>

                        {/*COMMENTS TAB*/}
                        <Tab eventKey="comments" title="Comments">
                            <div className="container wbdv-tab-data">

                                {/*THUMBS UP AND THUMBS DOWN*/}
                                <p className="wbdv-tab-thumbs">

                                    {/*THUMBS UP*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                           title="like"/>
                                        <br/>
                                        <span className="wbdv-word-like-number">
                                            10
                                        </span>
                                    </button>

                                    {/*THUMBS DOWN*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                           title="dislike"/>
                                        <br/>
                                        <span className="wbdv-word-dislike-number">
                                            1
                                        </span>
                                    </button>
                                </p>

                                {/*THE COMMENT*/}
                                <p className="wbdv-tab-data-input">A user-submitted comment would go here.</p>
                                <p className="wbdv-tab-data-user"> Submitted by: User </p>
                            </div>

                            <div className="container wbdv-tab-data">

                                {/*THUMBS UP AND THUMBS DOWN*/}
                                <p className="wbdv-tab-thumbs">

                                    {/*THUMBS UP*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                           title="like"/>
                                        <br/>
                                        <span className="wbdv-word-like-number">
                                            10
                                        </span>
                                    </button>

                                    {/*THUMBS DOWN*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                           title="dislike"/>
                                        <br/>
                                        <span className="wbdv-word-dislike-number">
                                            1
                                        </span>
                                    </button>
                                </p>

                                {/*THE COMMENT*/}
                                <p className="wbdv-tab-data-input">A user-submitted comment would go here.</p>
                                <p className="wbdv-tab-data-user"> Submitted by: User </p>
                            </div>
                        </Tab>

                        {/*DEFINITION TAB*/}
                        <Tab eventKey="definitions" title="User-Uploaded Definitions">
                            <div className="container wbdv-tab-data">

                                {/*THUMBS UP AND THUMBS DOWN*/}
                                <p className="wbdv-tab-thumbs">

                                    {/*THUMBS UP*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                           title="like"/>
                                        <br/>
                                        <span className="wbdv-word-like-number">
                                            10
                                        </span>
                                    </button>

                                    {/*THUMBS DOWN*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                           title="dislike"/>
                                        <br/>
                                        <span className="wbdv-word-dislike-number">
                                            1
                                        </span>
                                    </button>
                                </p>

                                {/*THE DEFINITION*/}
                                <p className="wbdv-tab-data-input">A user-submitted definition would go here.</p>
                                <p className="wbdv-tab-data-user"> Submitted by: User </p>
                            </div>

                            <div className="container wbdv-tab-data">

                                {/*THUMBS UP AND THUMBS DOWN*/}
                                <p className="wbdv-tab-thumbs">

                                    {/*THUMBS UP*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-up wbdv-word-like-icon"
                                           title="like"/>
                                        <br/>
                                        <span className="wbdv-word-like-number">
                                            10
                                        </span>
                                    </button>

                                    {/*THUMBS DOWN*/}
                                    <button className="wbdv-transparent-button">
                                        <i className="fa fa-thumbs-down wbdv-word-dislike-icon"
                                           title="dislike"/>
                                        <br/>
                                        <span className="wbdv-word-dislike-number">
                                            1
                                        </span>
                                    </button>
                                </p>

                                {/*THE DEFINITION*/}
                                <p className="wbdv-tab-data-input">A user-submitted definition would go here.</p>
                                <p className="wbdv-tab-data-user"> Submitted by: User </p>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default WordComponent
