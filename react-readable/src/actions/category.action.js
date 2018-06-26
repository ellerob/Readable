import { fetchCategories } from "../utils/api";

export const RECIEVED_CATEGORIES = 'RECIEVED_CATEGORIES'

export const getCategories = (categories) => ({
  type: RECIEVED_CATEGORIES,
  payload: categories
})

export const getCategories2 = () => dispatch =>
  fetchCategories()
    .then((categories) => dispatch(getCategories(categories)));
