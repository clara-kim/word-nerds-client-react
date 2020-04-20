import React from 'react';

class SentenceInputComponent extends React.Component {

    state = {
        newSentence: ""
    }

    addContent () {
        if (this.props.profile.userType === "PUBLIC"){
            alert("You must be logged in to perform this action!")
        } else {
            if (this.state.newSentence === "") {
                alert("Please fill in the field and try again!")
            } else {
                //console.log(this.state.newSentence);
                this.setState({newSentence: ""})
                // CALL ADD SERVICE CONTENT
            }
        }
    }

    render(){
        return(
            <div className="wbdv-input-div container">
                                <textarea className="container wbdv-input-data" title="Sentence"
                                          placeholder="Add a new sentence here..." value={this.state.newSentence}
                                          onChange={(e) => this.setState({newSentence: e.target.value})}/>
                <button className="container btn btn-success"
                        onClick={() => this.addContent()}>
                    Add New Sentence
                </button>
            </div>
        )
    }
}

export default SentenceInputComponent
