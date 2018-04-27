import {
  RECIEVED_CATEGORIES
} from '../actions/category.action'

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

export default categoriesReducer


