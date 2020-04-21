export const findQuotesForWord = (word) => ({
    type: FIND_QUOTES_FOR_WORD,
    word: word
})

export const FIND_QUOTES_FOR_WORD = "FIND_QUOTES_FOR_WORD"

export const deleteQuote = (contentId) => ({
    type: DELETE_QUOTE,
    contentId: contentId
})
export const DELETE_QUOTE = "DELETE_QUOTE"

export const createQuote = (quote) => ({
    type: CREATE_QUOTE,
    newQuote: quote
})
export const CREATE_QUOTE = "CREATE_QUOTE"

export const updateQuote = (contentId, quote) => ({
    type: UPDATE_QUOTE,
    updatedQuote: quote
})

export const UPDATE_QUOTE = "UPDATE_QUOTE"
