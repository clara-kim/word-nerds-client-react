export const findDefinitionsForWord = (word) => ({
    type: FIND_DEFINITIONS_FOR_WORD,
    word: word
})

export const FIND_DEFINITIONS_FOR_WORD = "FIND_DEFINITIONS_FOR_WORD"

export const deleteDefinition = (contentId) => ({
    type: DELETE_DEFINITION,
    contentId: contentId
})
export const DELETE_DEFINITION = "DELETE_DEFINITION"

export const createDefinition = (definition) => ({
    type: CREATE_DEFINITION,
    newDefinition: definition
})
export const CREATE_DEFINITION = "CREATE_DEFINITION"

export const updateDefinition = (contentId, definition) => ({
    type: UPDATE_DEFINITION,
    updatedDefinition: definition
})

export const UPDATE_DEFINITION = "UPDATE_DEFINITION"
