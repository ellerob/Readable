const api = 'http://localhost:3001'

const headers = {
  'Authorization': 'auth'
}

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then((response) => response.json())
    .then((data) => data.categories)

export const fetchPostsByCategory = (id) =>
  fetch(`${api}/${id}/posts`, { headers })
    .then((response) => response.json())

export const fetchPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then((response) => response.json())

export const fetchComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then((response) => response.json())

export const postPost = (data) =>
  fetch(`${api}/posts/`, { 
    method: 'POST',
    body: JSON.stringify(data),
    headers }
  )
