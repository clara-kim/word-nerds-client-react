import {FIND_SENTENCES_FOR_WORD, DELETE_SENTENCE, CREATE_SENTENCE, UPDATE_SENTENCE, } from "../actions/sentenceAction";

const initialState = { sentences: []}

const sentenceReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_SENTENCES_FOR_WORD:
            return {
                sentences: action.sentences
            }
        case CREATE_SENTENCE:
            return {
                sentences: [
                    ...state.sentences,
                    action.newSentence
                ]
            }
        case DELETE_SENTENCE:
            return {
                sentences: state.sentences.filter(sentence => sentence.contentId !== action.contentId)
            }
        case UPDATE_SENTENCE:
            return {
                sentences: [...state.sentences]
            }
        default:
            return state
    }
}

export default sentenceReducer;
