import { fetchCategories } from "../utils/api";

export const RECIEVED_CATEGORIES = 'RECIEVED_CATEGORIES'
export const RECIEVED_CATEGORY = 'RECIEVED_CATEGORY'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const ADD_POST = 'ADD_POST'

export const getCategories = (categories) => ({
  type: RECIEVED_CATEGORIES,
  payload: categories
})

export const recievedPostsByCategory = (data) => ({
  type: RECIEVED_CATEGORY,
  payload: data
})

export const getCategories2 = () => dispatch =>
  fetchCategories()
    .then((categories) => dispatch(getCategories(categories)));

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category
})

export function addPost({ category, post }) {
  return {
    type: ADD_POST,
    category,
    post,
  }
}

