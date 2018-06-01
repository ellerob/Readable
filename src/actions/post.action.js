import { fetchPostsByCategory, fetchPost, postPost } from "../utils/api";

export const RECIEVED_POSTS = 'RECIEVED_POSTS'
export const RECIEVED_POST = 'RECIEVED_POST'
export const CREATE_POST = 'CREATE_POST'

export const getPostsByCategory = props => {
  const id = props.match.params.id;
  fetchPostsByCategory(id)
    .then(data => props.recievedPosts(data));
}

export const getPost = props => {
  const id = props.match.params.id;
  fetchPost(id)
    .then(data => props.recievedPost(data));
}

export const addPost = props => {
  postPost()
  .then(data => props.createPost(data));
}

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
