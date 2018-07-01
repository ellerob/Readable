import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux';
import { recievedPosts, votePost, deletePost } from '../actions/post.action';
import { fetchPostsByCategory, deletePostCall } from '../utils/api';
import EditPost from './EditPost'
import { onVote } from '../utils/votingFunctions'

const getPostsByCategory = props => {
  const id = props.match.params.id;
  fetchPostsByCategory(id)
    .then(data => props.recievedPosts(data));
}

class CategoryPage extends React.Component {
  state = {
    editPost: 0,
  }
  componentDidMount() {
    getPostsByCategory(this.props);
  }

  render() {
    let vote
    let title = this.props.match.params.id;
    title = title.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    })
    const { posts, categories } = this.props;
    const { editPost } = this.state
    return (
      <div >
        {
          categories.map(category => {
            return (
              <Link key={category.name} to={`/category${category.path}`}>
                <button className="category-button"> {category.name} </button>
              </Link>
            )
          })
        }
        <div>
          <h1>{title}</h1>
        </div>
        {posts.length === 0 && 
          <h2>There are no posts in this category</h2>
        }
        {posts.length > 0 &&
          <h2>Posts</h2>
        }
        <Link to="/add-post" >
          <button>Add a new post</button>
        </Link>
        {posts && posts.map(post => (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <p>{`Title: ${post.title}`}</p>
            </Link>
            {posts && posts.map(post => (
          <div key={post.id}>
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
          </div>
        ))}
          </div>
        ))}
        <Link to="/"> Home </Link>
      </div>
    )
  }
}

function mapStatetoProps(state, props) {
  const { id } = props.match.params;
  return {
    categories: state.categories.categories,
    posts: state.posts.posts.filter(({ category }) => category === id)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    recievedPosts: (data) => dispatch(recievedPosts(data)),
    votePost: (updatedVotescore) => dispatch(votePost(updatedVotescore)),
    deletePost: (data) => dispatch(deletePost(data))
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(CategoryPage)