import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import { getCategories } from '../actions/category.action';
import { recievedPosts } from '../actions/post.action'
import { fetchCategories, fetchPosts } from '../utils/api'
import ListPosts from './ListPosts'


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
    if (!categories || categories.length === 0) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <div>
          <h1>File Review Website</h1>
        </div>
        <div className="buttons">
          {
            categories.map(category => {
              return (
                <Link key={category.name} to={`category${category.path}`}>
                  <button className="category-button"> {category.name} </button>
                </Link>
              )
            })
          }
        </div>
        <ListPosts
          posts={posts}
          
        />
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
    getCategories: (categories) => dispatch(getCategories(categories)),
    recievedPosts: (posts) => dispatch(recievedPosts(posts)),
  }
}
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(HomePage);
