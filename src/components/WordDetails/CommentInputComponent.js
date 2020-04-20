import React from 'react';

class CommentInputComponent extends React.Component {

    state = {
        newComment: ""
    }

    addContent () {
        if (this.props.profile.userType === "PUBLIC"){
            alert("You must be logged in to perform this action!")
        } else {
            if (this.state.newComment === "") {
                alert("Please fill in the field and try again!")
            } else {
                //console.log(this.state.newComment);
                this.setState({newComment: ""})
                // CALL ADD SERVICE CONTENT
            }
        }
    }

    render(){
        return(
            <div className="wbdv-input-div container">
                                <textarea className="container wbdv-input-data" title="Comment"
                                          placeholder="Add a new comment here..." value={this.state.newComment}
                                          onChange={(e) => this.setState({newComment: e.target.value})}/>
                <button className="container btn btn-success"
                        onClick={() => this.addContent()}>
                    Add New Comment
                </button>
            </div>
        )
    }
}

export default CommentInputComponent
