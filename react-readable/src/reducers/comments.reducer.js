import _ from 'lodash'
import { RECIEVED_COMMENTS, CREATE_COMMENT, VOTE_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from '../actions/comments.action'

const initialState = {
  comments: []
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIEVED_COMMENTS:
      return {
        ...state,
        comments: _.uniqBy([...state.comments, ...action.payload], 'id')
      }
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      }
    case VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              voteScore: action.payload.voteScore,
            }
          }
          return comment
        })
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              title: action.payload.titleNewSubmit,
              body: action.payload.bodyNewSubmit,
              timestamp: action.payload.timestamp
            }
          }
          return comment
        })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload),
      }
    default:
      return state
  }
}

export default commentsReducer