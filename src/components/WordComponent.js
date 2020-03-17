import React from "react";

/*
This is the word component that includes all details about a particular word.
Currently, it only displays the definition.
In the implementation, it will also include likes, comments, example sentences, quotes, etc.
 */
class WordComponent extends React.Component {

    state = {
        wordData: []
    }

    // For some reason, can only access one level down of the word JSON.
    // We can implement wordData structure properly when we build the server
    // Short def located at wordData[0].shortdef[0]
    getWordDef = () => {
        return this.state.wordData.shortdef
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
                <div className="container">
                    <h1 className="word-title">{this.props.word}</h1>
                    <div className="word-definition">
                        {this.getWordDef()}
                    </div>
                </div>
            </div>
        )
    }
}

export default WordComponent
