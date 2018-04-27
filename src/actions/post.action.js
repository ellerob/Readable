import { fetchPostsByCategory } from "../utils/api";
export const RECIEVED_POSTS = 'RECIEVED_POSTS'
export const ADD_POST = 'ADD_POST'

export const getPostsByCategory = props => {
  const id = props.match.params.id;
  fetchPostsByCategory(id)
    .then(data => props.recievedPosts(data));
}

export const recievedPosts = (data) => ({
  type: RECIEVED_POSTS,
  payload: data
})

export function addPost({ category, post }) {
  return {
    type: ADD_POST,
    category,
    post,
  }
}
