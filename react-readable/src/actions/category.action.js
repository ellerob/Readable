export const RECIEVED_CATEGORIES = 'RECIEVED_CATEGORIES'

export const getCategories = (categories) => ({
  type: RECIEVED_CATEGORIES,
  payload: categories
})

