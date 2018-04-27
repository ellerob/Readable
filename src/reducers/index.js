import { combineReducers } from 'redux'
import postsReducer from './posts.reducer'
import categoriesReducer from './category.reducer'


const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer
})

export default rootReducer


