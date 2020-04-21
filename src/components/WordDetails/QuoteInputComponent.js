import React from 'react';

class QuoteInputComponent extends React.Component {

    state = {
        userId: this.props.profile.userId,
        word: this.props.word,
        content : {
            contentType: 0,
            text: "",
            book: "",
            author: "",
        }
    }

    addQuote () {
        if (this.props.profile.userType === "PUBLIC"){
            alert("You must be logged in to perform this action!")
        }
        else if (this.state.content.book === "" || this.state.content.author === "" || this.state.content.text === "") {
            alert("Please fill in all fields and try again!")
        } else {
            //console.log(this.state.content.text + this.state.content.book + this.state.content.author);
            this.setState(
                {content:
                        {...this.state.content,
                            text: "", book: "", author: ""}})
            // CALL ADD SERVICE CONTENT
        }
    }

    render(){
        return(
            <div className="wbdv-input-div container">
                <textarea className="container wbdv-input-data" title="Quote"
                          placeholder="Add a new quote here..." value={this.state.content.text}
                          onChange={(e) => this.setState(
                              {content:
                                      {...this.state.content,
                                      text: e.target.value}})}
                />
                <input type="text" className="container wbdv-input-data" title="Book"
                       placeholder="Add quote's book here..." value={this.state.content.book}
                       onChange={(e) => this.setState(
                           {content:
                                   {...this.state.content,
                                       book: e.target.value}})}
                />
                <input type="text" className="container wbdv-input-data" title="Author"
                       placeholder="Add quote's author here..." value={this.state.content.author}
                       onChange={(e) => this.setState(
                           {content:
                                   {...this.state.content,
                                       author: e.target.value}})}
                />
                <button className="container btn btn-success"
                        onClick={() => this.addQuote()}>
                    Add New Quote
                </button>
            </div>
        )
    }
}

export default QuoteInputComponent