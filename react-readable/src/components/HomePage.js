import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import moment from 'moment'
import '../App.css';
import { getCategories } from '../actions/category.action';
import { recievedPosts, votePost, deletePost } from '../actions/post.action'
import { fetchCategories, fetchPosts, deletePostCall } from '../utils/api'
import EditPost from './EditPost'
import { onVote } from '../utils/votingFunctions'

class HomePage extends Component {
  state = {
    editPost: 0,
  }

  componentDidMount() {
    const { categories, recievedPosts, getCategories } = this.props;
    fetchPosts()
      .then(posts => recievedPosts(posts))
    if (categories.length === 0) {
      fetchCategories()
        .then((categories) => getCategories(categories))
    }
  }

  render() {
    const { categories, posts } = this.props;
    const { editPost } = this.state
    let vote = ''
    if (!categories || categories.length === 0) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <div>
          <h1>File Review Website</h1>
        </div>
        <div className="buttons">
          {categories.map(category => {
            return (
              <Link key={category.name} to={`category${category.path}`}>
                <button className="category-button"> {category.name} </button>
              </Link>
            )
          })}
        </div>
        {posts && posts.map(post => (
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
            {editPost === 1 &&
              <EditPost
                titleCurrent={post.title}
                bodyCurrent={post.body}
                id={post.id}
              />
            }
          </div>
        ))}
        <Link to="/add-post" >
          <button>Add a new post</button>
        </Link>

      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    categories: state.categories.categories,
    posts: state.posts.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: (data) => dispatch(getCategories(data)),
    recievedPosts: (data) => dispatch(recievedPosts(data)),
    votePost: (updatedVotescore) => dispatch(votePost(updatedVotescore)),
    deletePost: (data) => dispatch(deletePost(data))
  }
}
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(HomePage);
