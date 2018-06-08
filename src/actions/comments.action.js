import { fetchComments } from '../utils/api'
export const RECIEVED_COMMENTS = 'RECIEVED_COMMENTS'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'


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



// export const getComment = props => {
//   const id = props.match.params.id;
//   fetchComment(id)
//     .then(data => props.recievedComment(data));
// }

// export const recievedComment = data => ({
//   type: RECIEVED_COMMENT,
//   payload: data
// })
