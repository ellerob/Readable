import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { recievedPosts } from '../actions/post.action';
import { fetchPostsByCategory } from '../utils/api';
import ListPosts from './ListPosts';

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
    let title = this.props.match.params.id;
    title = title.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    })
    const { posts, categories } = this.props;
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
        {
          posts.length === 0 &&
          <h2>There are no posts in this category</h2>
        }
        {
          posts.length > 0 &&
          <div>
            <h2>Posts</h2>
            <ListPosts
              posts={posts}
            />
          </div>
        }
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
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(CategoryPage)