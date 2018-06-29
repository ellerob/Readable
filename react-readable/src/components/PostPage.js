import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { recievedPost, votePost, deletePost } from '../actions/post.action'
import { recievedComments } from '../actions/comments.action'
import { fetchPost, deletePostCall, fetchCommentsCall } from '../utils/api'
import Comment from './Comment'
import AddComment from './AddComment'
import EditPost from './EditPost'
import { onVote } from '../utils/votingFunctions'

const getPost = props => {
  const id = props.match.params.id;
  fetchPost(id)
    .then(data => props.recievedPost(data));
}

const getComments = props => {
  const id = props.match.params.id;
  fetchCommentsCall(id)
    .then(data => props.recievedComments(data));
}

class PostPage extends React.Component {
  state = {
    editPost: 0,
  }

  componentDidMount() {
    getPost(this.props);
    getComments(this.props);
  }

  render() {
    const { post } = this.props;
    const { comments } = this.props;
    const { editPost } = this.state;
    let vote
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
        <p>{`Current Score: ${post.voteScore}`}</p>
        <p>{`Number of comments: ${post.commentCount}`}</p>
        <div className="buttons">
          <button
            onClick={(e) => this.setState({ editPost: 1 })}
          >
            Edit Post
          </button>
          <button
            onClick={() => {
              this.props.votePost(onVote(post.voteScore, vote = 'upVote', post.id))
            }}
          >
            Upvote Post
          </button>
          <button
            onClick={() => {
              this.props.votePost(onVote(post.voteScore, vote = 'downVote', post.id))
            }}
          >
            Downvote Post
          </button>
          <button
            onClick={(e) => {
              this.props.deletePost(post.id)
              deletePostCall(post.id)
            }}
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
    categories: state.categories.categories,
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