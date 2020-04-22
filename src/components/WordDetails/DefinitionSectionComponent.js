import React from "react";
import "../WordComponent.css"
import DefinitionComponent from "./DefinitionComponent";
import DefinitionInputComponent from "./DefinitionInputComponent"
import ContentService from "../../services/ContentService";
import {
    CREATE_DEFINITION,
    DELETE_DEFINITION,
    FIND_DEFINITIONS_FOR_WORD, UPDATE_DEFINITION
} from "../../actions/definitionAction";
import {connect} from "react-redux";

class DefinitionSectionComponent extends React.Component {

    componentDidMount() {
        this.props.findDefinitionsForWord(this.props.word);
    }

    render() {
        return (
            <div>
                {this.props.definitions && this.props.definitions.map( content =>
                <DefinitionComponent
                    profile={this.props.profile}
                    content = {content}
                    key={content.contentId}
                    deleteDefinition = {this.props.deleteDefinition}
                    updateDefinition = {this.props.updateDefinition}
                />
                )}
                <DefinitionInputComponent
                    profile={this.props.profile}
                    word={this.props.word}
                    createDefinition = {this.props.createDefinition}
                />
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        definitions: state.definitions.definitions
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findDefinitionsForWord: (word) =>
            ContentService.findDefinitionsForWord(word)
                .then(actualDefinitions => dispatch({
                                                   type: FIND_DEFINITIONS_FOR_WORD,
                                                   definitions: actualDefinitions
                                               })),
        deleteDefinition: (contentId) =>
            ContentService.deleteContent(contentId)
                .then(status =>
                          dispatch({
                                       type: DELETE_DEFINITION,
                                       contentId: contentId
                                   })
                ),
        createDefinition: (newDefinition, userId, word) =>
            ContentService.createContent(newDefinition, userId, word)
                .then(actualDefinition =>
                          dispatch({
                                       type: CREATE_DEFINITION,
                                       newDefinition: actualDefinition
                                   })
                ),
        updateDefinition: (contentId, definition) =>
            ContentService.updateContent(contentId, definition)
                .then(definition =>
                          dispatch({
                                       type: UPDATE_DEFINITION,
                                       updatedDefinition: definition
                                   })
                )
    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper) (DefinitionSectionComponent)
