const api = 'http://localhost:3001'

const headers = {
  'Authorization': 'auth'
}

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
  .then((response) => response.json())
  .then((data) => data.categories);

export const fetchCategory = (id) =>
  fetch(`${api}/${id}/posts`, { headers })
  .then((response) => response.json())
  .then(data => data.categories)

