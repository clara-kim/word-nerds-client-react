import {FIND_COMMENTS_FOR_WORD, DELETE_COMMENT, CREATE_COMMENT, UPDATE_COMMENT, } from "../actions/commentAction";

const initialState = { comments: []}

const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_COMMENTS_FOR_WORD:
            return {
                comments: action.comments
            }
        case CREATE_COMMENT:
            return {
                comments: [
                    ...state.comments,
                    action.newComment
                ]
            }
        case DELETE_COMMENT:
            return {
                comments: state.comments.filter(comment => comment.contentId !== action.contentId)
            }
        case UPDATE_COMMENT:
            return {
                comments: [...state.comments]
            }
        default:
            return state
    }
}

export default commentReducer;
