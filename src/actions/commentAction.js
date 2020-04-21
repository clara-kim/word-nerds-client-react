export const findCommentsForWord = (word) => ({
    type: FIND_COMMENTS_FOR_WORD,
    word: word
})

export const FIND_COMMENTS_FOR_WORD = "FIND_COMMENTS_FOR_WORD"

export const deleteComment = (contentId) => ({
    type: DELETE_COMMENT,
    contentId: contentId
})
export const DELETE_COMMENT = "DELETE_COMMENT"

export const createComment = (comment) => ({
    type: CREATE_COMMENT,
    newComment: comment
})
export const CREATE_COMMENT = "CREATE_COMMENT"

export const updateComment = (contentId, comment) => ({
    type: UPDATE_COMMENT,
    updatedComment: comment
})

export const UPDATE_COMMENT = "UPDATE_COMMENT"
