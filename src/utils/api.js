const api = 'http://localhost:3001'

const headers = {
  'Authorization': 'auth',
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

export const postPost = (newPost) => {
  return(
    fetch(`${api}/posts`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost),
      })
    .then(response => response.json()))
  }

export const postComment = (newComment) => {
  return(
    fetch(`${api}/comments`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment),
      })
    .then(response => response.json()))
  }
