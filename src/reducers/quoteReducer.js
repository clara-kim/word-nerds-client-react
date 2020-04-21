import {FIND_QUOTES_FOR_WORD, DELETE_QUOTE, CREATE_QUOTE, UPDATE_QUOTE, } from "../actions/quoteAction";

const initialState = { quotes: [
    {contentId: 123, text: "I'm a quote trolollololololololol", book: "I'm the book", author: "I'm the author.",
        contributor: {userId: 11, username: "userA"}},
    {contentId: 234, text: "I'm a quote2 trolollololololololol", book: "I'm the book2", author: "I'm the author2",
        contributor: {userId: 11, username: "userB"}},
    {contentId: 345, text: "I'm a quote3 trolollololololololol", book: "I'm the book3", author: "I'm the author3",
        contributor: {userId: 345, username: "userC"}}
    ]}

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
