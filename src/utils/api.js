const api = 'http://localhost:3001'

const headers = {
  'Authorization':
    'elle'
}

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
  .then((response) => response.json())
  .then(data => data.categories)

