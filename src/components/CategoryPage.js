import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getPostsByCategory, recievedPosts } from '../actions/post.action';


class CategoryPage extends React.Component {
  componentDidMount() {
    getPostsByCategory(this.props);
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <div>
          <h1>{this.props.match.params.id}</h1>
        </div>
        <div>
          {posts.map(post => (
            <h3 key={post.id}>{post.title}</h3>
          ))}
        <div>
          </div>
          <Link to="/">
            Home
        </Link>
        </div>
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