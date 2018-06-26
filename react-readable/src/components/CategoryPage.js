import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { recievedPosts } from '../actions/post.action';
import { fetchPostsByCategory } from '../utils/api';

const getPostsByCategory = props => {
  const id = props.match.params.id;
  fetchPostsByCategory(id)
    .then(data => props.recievedPosts(data));
}

class CategoryPage extends React.Component {
  componentDidMount() {
    getPostsByCategory(this.props);
  }

  render() {
    var title = this.props.match.params.id;
    title = title.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    })
    const { posts } = this.props;
    return (
      <div>
        <div>
          <h1>{title}</h1>
        </div>
        {posts.length === 0 && 
          <h2>There are no posts in this category</h2>
        }
        {posts.length > 0 &&
          <h2>Posts</h2>
        }
        {posts && posts.map(post => (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <p>{`Title: ${post.title}`}</p>
            </Link>
            <p>{`Author: ${post.author}`}</p>
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
    posts: state.posts.posts.filter(({ category }) => category === id)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    recievedPosts: (data) => dispatch(recievedPosts(data)),
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(CategoryPage)