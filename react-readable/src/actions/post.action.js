export const RECIEVED_POSTS = 'RECIEVED_POSTS'
export const RECIEVED_POST = 'RECIEVED_POST'
export const CREATE_POST = 'CREATE_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const SORT_POSTS = 'SORT_POSTS'

export const recievedPosts = data => ({
  type: RECIEVED_POSTS,
  payload: data
})

export const recievedPost = data => ({
  type: RECIEVED_POST,
  payload: data
})

export const createPost = data => ({
  type: CREATE_POST,
  payload: data
})

export const votePost = data => ({
  type: VOTE_POST,
  payload: data
})

export const deletePost = data => ({
  type: DELETE_POST,
  payload: data
})

export const editPost = data => ({
  type: EDIT_POST,
  payload: data
})

export const sortPosts = data => ({
  type: SORT_POSTS,
  payload: data
})
