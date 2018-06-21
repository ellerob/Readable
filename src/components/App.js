import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import { getCategories2 } from '../actions/category.action';

class App extends Component {

  componentDidMount() {
    const { categories } = this.props;
    if (categories.length === 0) {
      this.props.getAllCategories();
    }
  }

  render() {
    const { categories } = this.props;
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
        <Link to="/add-post" >
          <button>Add a new post</button>
        </Link>
        <Link to="/"> Home </Link>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    categories: state.categories.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(getCategories2()),
  }
}
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(App);
