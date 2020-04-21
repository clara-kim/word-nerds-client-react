import {FIND_QUOTES_FOR_WORD, DELETE_QUOTE, CREATE_QUOTE, UPDATE_QUOTE, } from "../actions/quoteAction";

const initialState = { quotes: []}

const quoteReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_QUOTES_FOR_WORD:
            return {
                quotes: action.quotes
            }
        case CREATE_QUOTE:
            return {
                quotes: [
                    ...state.quotes,
                    action.newQuote
                ]
            }
        case DELETE_QUOTE:
            return {
                quotes: state.quotes.filter(quote => quote.contentId !== action.contentId)
            }
        case UPDATE_QUOTE:
            return {
                quotes: [...state.quotes]
            }
        default:
            return state
    }
}

export default quoteReducer;
