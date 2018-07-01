import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import moment from 'moment'
import _ from 'lodash'
import '../App.css';
import { votePost, deletePost, sortPosts } from '../actions/post.action'
import { deletePostCall } from '../utils/api'
import EditPost from './EditPost'
import { onVote } from '../utils/votingFunctions'

class ListPosts extends Component {
  state = {
    editPost: 0,
  }

  render() {
    const { posts } = this.props;
    const { editPost } = this.state
    let vote = ''
    const postsByDate = _.sortBy(posts, function (o) { return new moment(o.timestamp) }).reverse()
    const postsByVotes = _.sortBy(posts, function (o) { return new moment(o.voteScore) }).reverse()

    return (
      <div>
        <button
          onClick={() => this.props.sortPosts(postsByDate)}
        >
          Sort posts by date
        </button>
        <button
          onClick={() => this.props.sortPosts(postsByVotes)}
        >
          Sort posts by score
        </button>
        {
          posts && posts.map(post => (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h1>{`Title: ${post.title}`}</h1>
              </Link>
              <p>{`Author: ${post.author}`}</p>
              <p>{`Time Posted: ${moment(post.timestamp).format('LLLL')}`}</p>
              <p>{`Current Score: ${post.voteScore}`}</p>
              <p>{`Number of comments: ${post.commentCount}`}</p>
              <div className="buttons">
                <button
                  onClick={() => this.setState({ editPost: 1 })}
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
                  onClick={() => {
                    this.props.deletePost(post.id)
                    deletePostCall(post.id)
                  }}
                >
                  Delete Post
              </button>
              </div>
              {
                editPost === 1 &&
                  <EditPost
                    titleCurrent={post.title}
                    bodyCurrent={post.body}
                    id={post.id}
                  />
              }
            </div>
          ))
        }
        <Link to="/add-post" >
          <button>Add a new post</button>
        </Link>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    categories: state.categories.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (updatedVotescore) => dispatch(votePost(updatedVotescore)),
    deletePost: (post) => dispatch(deletePost(post)),
    sortPosts: (posts) => dispatch(sortPosts(posts))
  }
}
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ListPosts);


// reference to https://thomaskekeisen.de/en/blog/array-date-sort-lodash-momentjs/ for sortBy functions; 