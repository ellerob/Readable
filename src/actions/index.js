import { fetchCategories } from "../utils/api";

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ADD_POST = 'ADD_POST'

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories
})

export const getCategories2 = () => dispatch =>
  fetchCategories()
    .then((categories) => dispatch(getCategories(categories)));


export function addPost({ category, post }) {
  return {
    type: ADD_POST,
    category,
    post,
  }
}

