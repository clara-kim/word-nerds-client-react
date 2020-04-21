import React from "react";
import "../WordComponent.css"
import DefinitionComponent from "./DefinitionComponent";
import DefinitionInputComponent from "./DefinitionInputComponent"

class DefinitionSectionComponent extends React.Component {

    render() {
        return (
            <div>
                <DefinitionComponent profile={this.props.profile}/>
                <DefinitionInputComponent profile={this.props.profile}/>
            </div>
        )
    }
}

export default DefinitionSectionComponent
