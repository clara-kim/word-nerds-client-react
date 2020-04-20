import React from 'react';

class QuoteInputComponent extends React.Component {

    state = {
        newQuote: "",
        newBook: "",
        newAuthor: "",
    }

    addQuote () {
        if (this.props.profile.userType === "PUBLIC"){
            alert("You must be logged in to perform this action!")
        }
        else if (this.state.newBook === "" || this.state.newAuthor === "" || this.state.newQuote === "") {
            alert("Please fill in all fields and try again!")
        } else {
            //console.log(this.state.newBook + this.state.newAuthor + this.state.newQuote);
            this.setState({newBook: "", newAuthor: "", newQuote: ""});
            // CALL ADD SERVICE CONTENT
        }
    }

    render(){
        return(
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
                        onClick={() => this.addQuote()}>
                    Add New Quote
                </button>
            </div>
        )
    }
}

export default QuoteInputComponent
