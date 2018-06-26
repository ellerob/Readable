import { combineReducers } from 'redux'
import postsReducer from './posts.reducer'
import categoriesReducer from './category.reducer'
import commentsReducer from './comments.reducer'


const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer,
})

export default rootReducer


