import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { recievedPost, votePost, deletePost } from '../actions/post.action'
import { recievedComments, getComments } from '../actions/comments.action'
import { fetchPost, votePostCall, deletePostCall } from '../utils/api'
import Comment from './Comment'
import AddComment from './AddComment'
import EditPost from './EditPost'

const getPost = props => {
  const id = props.match.params.id;
  fetchPost(id)
    .then(data => props.recievedPost(data));
}

class PostPage extends React.Component {
  state = {
    editPost: 0,
  }

  componentDidMount() {
    getPost(this.props);
    getComments(this.props);
  }

  onUpvote() {
    const option = { option: "upVote" }
    const voteScoreNew = this.props.post.voteScore + 1
    this.onSubmit(voteScoreNew, option)
  }

  onDownvote() {
    const option = { option: "downVote" }
    const voteScoreNew = this.props.post.voteScore - 1
    this.onSubmit(voteScoreNew, option)
  }

  onDelete() {
    const id = this.props.match.params.id;
    this.props.deletePost(id)
    deletePostCall(id)
  }

  onSubmit(voteScoreNew, option) {
    const id = this.props.match.params.id;
    const updatedVotescore = {
      id,
      voteScoreNew
    }
    this.props.votePost(updatedVotescore)
    votePostCall(id, option)
  }

  render() {
    const { post } = this.props;
    const { comments } = this.props;
    const { editPost } = this.state;
    if (!post) {
      return (
        <div>
          <div>Loading</div>
          <Link to="/"> Home </Link>
        </div>
      )
    }

    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>{`Author: ${post.author}`}</p>
        <p>{`Time Posted: ${moment(post.timestamp).format('LLLL')}`}</p>
        <p>{`Vote Score: ${post.voteScore}`}</p>
        <div className="buttons">
          <button
            onClick={(e) => this.setState({ editPost: 1 })}
          >
            Edit Post
          </button>
          <button
            onClick={(e) => this.onUpvote(e)}
          >
            Upvote Post
          </button>
          <button
            onClick={(e) => this.onDownvote(e)}
          >
            Downvote Post
          </button>
          <button
            onClick={(e) => this.onDelete(e)}
          >
            Delete Post
          </button>
        </div>
        {editPost === 1 &&
          <EditPost 
            titleCurrent={post.title}
            bodyCurrent={post.body}
            id={post.id}
          />
        }
        {comments.length === 0 &&
          <h2>There are no comments for this post</h2>
        }
        {comments.length > 0 && 
          <h2>Comments</h2>
        }
        <div>
          {comments.map(comment => (
            <div className="outline">
              <Comment
                id={comment.id}
                body={comment.body}
                timestamp={comment.timestamp}
                author={comment.author}
                voteScore={comment.voteScore}
                parentId={comment.parentId}
              />
            </div>
          ))}
          <p>Add Comment</p>
          <AddComment
            parentId={this.props.match.params.id}
          >
          </AddComment>
          <Link to="/"> Home </Link>
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state, props) {
  const { id } = props.match.params;
  return {
    post: state.posts.posts.find(({ id: postId }) => id === postId),
    comments: state.comments.comments.filter(({ parentId }) => id === parentId),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    recievedComments: (data) => dispatch(recievedComments(data)),
    recievedPost: (data) => dispatch(recievedPost(data)),
    votePost: (updatedVotescore) => dispatch(votePost(updatedVotescore)),
    deletePost: (data) => dispatch(deletePost(data))
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(PostPage)