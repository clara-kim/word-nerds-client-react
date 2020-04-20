import React from 'react';

class DefinitionInputComponent extends React.Component {

    state = {
        newDefinition: ""
    }

    addContent () {
        if (this.props.profile.userType === "PUBLIC"){
            alert("You must be logged in to perform this action!")
        } else {
            if (this.state.newDefinition === "") {
                alert("Please fill in the field and try again!")
            } else {
                //console.log(this.state.newDefinition);
                this.setState({newDefinition: ""})
                // CALL ADD SERVICE CONTENT
            }
        }
    }

    render(){
        return(
            <div className="wbdv-input-div container">
                        <textarea className="container wbdv-input-data" title="Quote"
                                  placeholder="Add a new definition here..." value={this.state.newDefinition}
                                  onChange={(e) => this.setState({newDefinition: e.target.value})}/>
                <button className="container btn btn-success"
                        onClick={() => this.addContent()}>
                    Add New Definition
                </button>
            </div>
        )
    }
}

export default DefinitionInputComponent
