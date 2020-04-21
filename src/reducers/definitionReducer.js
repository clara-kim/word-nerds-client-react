import {FIND_DEFINITIONS_FOR_WORD, DELETE_DEFINITION, CREATE_DEFINITION, UPDATE_DEFINITION, } from "../actions/definitionAction";

const initialState = { definitions: []}

const definitionReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_DEFINITIONS_FOR_WORD:
            return {
                definitions: action.definitions
            }
        case CREATE_DEFINITION:
            return {
                definitions: [
                    ...state.definitions,
                    action.newDefinition
                ]
            }
        case DELETE_DEFINITION:
            return {
                definitions: state.definitions.filter(definition => definition.contentId !== action.contentId)
            }
        case UPDATE_DEFINITION:
            return {
                definitions: [...state.definitions]
            }
        default:
            return state
    }
}

export default definitionReducer;
