import React from 'react';

class SentenceInputComponent extends React.Component {

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

    addContent () {
        if (this.props.profile.userType === "PUBLIC"){
            alert("You must be logged in to perform this action!")
        } else {
            if (this.state.content.text === "") {
                alert("Please fill in the field and try again!")
            } else {
                //console.log(this.state.content.text);
                this.setState(
                    {content:
                            {...this.state.content,
                                text: ""}})
                // CALL ADD SERVICE CONTENT
            }
        }
    }

    render(){
        return(
            <div className="wbdv-input-div container">
                                <textarea className="container wbdv-input-data" title="Sentence"
                                          placeholder="Add a new sentence here..." value={this.state.content.text}
                                          onChange={(e) => this.setState(
                                              {content:
                                                      {...this.state.content,
                                                          text: e.target.value}})}/>
                <button className="container btn btn-success"
                        onClick={() => this.addContent()}>
                    Add New Sentence
                </button>
            </div>
        )
    }
}

export default SentenceInputComponent
