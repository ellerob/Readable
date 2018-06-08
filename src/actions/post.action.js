export const RECIEVED_POSTS = 'RECIEVED_POSTS'
export const RECIEVED_POST = 'RECIEVED_POST'
export const CREATE_POST = 'CREATE_POST'

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
