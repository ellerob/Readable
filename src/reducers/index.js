import { combineReducers } from 'redux'
import {
  RECIEVED_CATEGORIES
} from '../actions'

const initialState = {
  categories: []
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIEVED_CATEGORIES:
      return {
        ...state,
        categories: [ ...state.categories, ...action.payload ]
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories: categoriesReducer,
})

export default rootReducer


