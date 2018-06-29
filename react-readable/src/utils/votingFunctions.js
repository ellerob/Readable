import { votePostCall } from './api'

export const onVote = (voteScore, vote, id) => {
  const option = { option: vote }
  votePostCall(id, option)

  if (vote === 'upVote') {
    const voteScoreNew = voteScore + 1
    const updatedVotescore = {
      id,
      voteScoreNew
    }
    return updatedVotescore
    
  } else if (vote === 'downVote') {
    const voteScoreNew = voteScore - 1
    const updatedVotescore = {
      id,
      voteScoreNew
    }
    return updatedVotescore
  }
}