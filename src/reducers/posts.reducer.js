import _ from 'lodash'
import {
  RECIEVED_POSTS
} from '../actions/post.action'

const initialState = {
  posts: []
};

const postsReducer = (state = initialState, action) => {
  console.log('action', action);
  console.log('state', state);
  switch (action.type) {
    case RECIEVED_POSTS: 
    return {
      ...state,
      posts: _.uniqBy([ ...state.posts, ...action.payload ], 'id')
    }
    default: 
    return state
  }
}


export default postsReducer


