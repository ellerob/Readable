import _ from 'lodash'
import {
  RECIEVED_POST,
  RECIEVED_POSTS,
  CREATE_POST
} from '../actions/post.action'

const initialState = {
  posts: []
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIEVED_POSTS: 
    return {
      ...state,
      posts: _.uniqBy([ ...state.posts, ...action.payload ], 'id')
    }
    case RECIEVED_POST: 
    return {
      ...state,
      posts: state.posts.length === 0
        ? [action.payload]
        : state.posts.map(post => {
          if (post.id === action.payload.id) {
            return action.payload
          }
          return post
        })
    }
    case CREATE_POST:
    return {
      ...state,
      posts: [...state.posts, action.payload]
    }
    default: 
    return state
  }


}


export default postsReducer


