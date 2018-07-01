import _ from 'lodash'
import {
  RECIEVED_POST,
  RECIEVED_POSTS,
  CREATE_POST,
  VOTE_POST,
  DELETE_POST,
  EDIT_POST,
  SORT_POSTS
} from '../actions/post.action'

const initialState = {
  posts: []
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIEVED_POSTS:
    
      return {
        ...state,
        posts: _.uniqBy([...state.posts, ...action.payload], 'id')
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
    case VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              voteScore: action.payload.voteScoreNew,
            }
          }
          return post
        }
      )
    }
    case EDIT_POST:
    return {
      ...state,
      posts: state.posts.map(post => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            title: action.payload.title,
            body: action.payload.body,
            timestamp: action.payload.timestamp
          }
        }
        return post
      }
      )
    }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      }
    case SORT_POSTS:
    return {
      ...state,
      posts: action.payload
    }
    default:
      return state
  }


}


export default postsReducer


