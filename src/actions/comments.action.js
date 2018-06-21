import { fetchComments } from '../utils/api'
export const RECIEVED_COMMENTS = 'RECIEVED_COMMENTS'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export const getComments = props => {
  const id = props.match.params.id;
  fetchComments(id)
    .then(data => props.recievedComments(data));
}

export const recievedComments = data => {
  return {
    type: RECIEVED_COMMENTS,
    payload: data
  };
};

export const requestComments = data => ({
  type: REQUEST_COMMENTS,
  payload: data
})

export const createComment = data => ({
  type: CREATE_COMMENT,
  payload: data
})

export const voteComment = data => ({
  type: VOTE_COMMENT,
  payload: data
})

export const deleteComment = data => ({
  type: DELETE_COMMENT,
  payload: data
})

export const editComment = data => ({
  type: EDIT_COMMENT,
  payload: data
})
