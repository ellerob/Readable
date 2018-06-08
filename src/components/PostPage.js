import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { recievedPost } from '../actions/post.action'
import { recievedComments, getComments } from '../actions/comments.action'
import { fetchPost } from '../utils/api';
import Comment from './Comment'

const getPost = props => {
  const id = props.match.params.id;
  fetchPost(id)
    .then(data => props.recievedPost(data));
}

class PostPage extends React.Component {
  componentDidMount() {
    getPost(this.props);
    getComments(this.props);
  }

  render() {
    const { post } = this.props;
    const { comments } = this.props;
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
        <h2>Comments</h2>
        <div>
          {comments.map(comment => (
            <div className="outline">
              <Comment 
                id={comment.id}
                body={comment.body}
                timestamp={comment.timestamp}
                author={comment.author}
              />
            </div>
          ))}
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
    comments: state.comments.comments.filter(({ parentId }) => id === parentId)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    recievedComments: (data) => dispatch(recievedComments(data)),
    recievedPost: (data) => dispatch(recievedPost(data))
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(PostPage)