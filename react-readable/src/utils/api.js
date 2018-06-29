const api = 'http://localhost:3001'

const headers = {
  'Authorization': 'auth',
}

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then((response) => response.json())
    .then((data) => data.categories)

export const fetchPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then((response) => response.json())

export const fetchPostsByCategory = (id) =>
  fetch(`${api}/${id}/posts`, { headers })
    .then((response) => response.json())

export const fetchPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then((response) => response.json())

export const postPost = (newPost) => {
  return (
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

export const votePostCall = (id, option) => {
  console.log('UPVOTE', option, id)
  return (
    fetch(`${api}/posts/${id}`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(option),
      })
      .then(response => response.json()))
}

export const deletePostCall = (id) => {
  return (
    fetch(`${api}/posts/${id}`,
      {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json()))
}


export const editPostCall = (id, toServer) => {
  return (
    fetch(`${api}/posts/${id}`,
      {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toServer)
      })
      .then(response => response.json()))
}

export const fetchCommentsCall = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then((response) => response.json())



export const postComment = (newComment) => {
  return (
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

export const deleteCommentCall = (id) => {
  return (
    fetch(`${api}/comments/${id}`,
      {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json()))
}

export const editCommentCall = (id, toServer) => {
  return (
    fetch(`${api}/comments/${id}`,
      {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toServer)
      })
      .then(response => response.json()))
}