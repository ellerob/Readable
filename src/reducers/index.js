import { combineReducers } from 'redux'
import {
  GET_CATEGORIES,
  SELECT_CATEGORY
} from '../actions'

const fetchCategoriesReducer = (state = { categories: [] }, action) => {
  switch(action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}

const selectCategoryReducer = (state = '', action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

const rootReducer = combineReducers({
  fetchCategoriesReducer,
  selectCategoryReducer
})

export default rootReducer


