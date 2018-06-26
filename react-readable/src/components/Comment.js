import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux';
import { voteComment, deleteComment } from '../actions/comments.action'
import { deleteCommentCall } from '../utils/api'
import EditComment from './EditComment'


class Comments extends React.Component {
  state = {
    voteScore: '',
    editComment: 0,
  }

  componentDidMount() {
    const { voteScore } = this.props;
    this.setState({ voteScore })
  }

  onDelete() {
    const { id } = this.props;
    this.props.deleteComment(id)
    deleteCommentCall(id)
  }

  onUpvote() {
    this.setState({ voteScore: (this.state.voteScore + 1) })
    this.onSubmit(this.state.voteScore)
  }

  onDownvote() {
    this.setState({ voteScore: (this.state.voteScore - 1) })
    this.onSubmit(this.state.voteScore)
  }

  onSubmit() {
    const { voteScore } = this.state;
    const { id } = this.props;
    const updatedVotescore = {
      id,
      voteScore
    }
    this.props.voteComment(updatedVotescore)
  }

  render() {
    const { body, author, timestamp, id } = this.props
    const { voteScore } = this.state
    return (
      <div>
        <p>{body}</p>
        <p>{`Author: ${author}`}</p>
        <p>{`Time Posted: ${moment(timestamp).format('LLLL')}`}</p>
        <p>{`Upvotes: ${voteScore}`}</p>
        <div className="buttons">
          <button
            onClick={(e) => this.setState({ editComment: 1 })}
          >
            Edit Comment
          </button>
          <button
            onClick={(e) => this.onUpvote(e)}
          >
            Upvote Comment
          </button>
          <button
            onClick={(e) => this.onDownvote(e)}
          >
            Downvote Comment
          </button>
          <button
            onClick={(e) => this.onDelete(e)}
          >
            Delete Comment
          </button>
        </div>
        {this.state.editComment === 1 &&
          <EditComment 
            bodyCurrent={body}
            id={id}
          />
        }
      </div>
    )
  }
}


function mapStatetoProps(state) {
  return {
    comments: state.comments.comments,
  }
}

function mapDispatchToProps(dispatch) {
   return {
    voteComment: (updatedVotescore) => dispatch(voteComment(updatedVotescore)),
    deleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Comments)
