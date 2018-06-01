import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getPostsByCategory, recievedPosts } from '../actions/post.action';

class CategoryPage extends React.Component {
  
  componentDidMount() {
    getPostsByCategory(this.props);
  }
  
  render() {
    var title = this.props.match.params.id;
    title = title.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    })
    const { posts } = this.props;
    return (
      <div>
        <div>
          <h1>{title}</h1>
        </div>
        <h2>Posts</h2>
          {posts.map(post => (
            <div key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <p>{`Title: ${post.title}`}</p>
              </Link>
              <p>{`Author: ${post.author}`}</p>
            </div>
          ))}
        <Link to="/add-post" >
          <button>Add a new post</button>
        </Link>
          <Link to="/"> Home </Link>
        </div>
    )
  }
}

function mapStatetoProps(state, props) {
  const { id } = props.match.params;
  return {
    posts: state.posts.posts.filter(({ category }) => category === id ? true : false)
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