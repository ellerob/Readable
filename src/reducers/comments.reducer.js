import _ from 'lodash'
import { RECIEVED_COMMENTS, CREATE_COMMENT } from '../actions/comments.action'

const initialState = {
  comments: []
};

const commentsReducer = (state = initialState, action) => {
  console.log('action', action);
  switch (action.type) {
    case RECIEVED_COMMENTS:
      return {
        ...state,
        comments: _.uniqBy([ ...state.comments, ...action.payload ], 'id')
      }
    case CREATE_COMMENT:
    return {
      ...state,
      comments: [...state.comments, action.payload]
    }   
    default: 
      return state
    }
}

export default commentsReducer