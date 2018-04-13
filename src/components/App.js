import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import { getCategories2, selectCategory } from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.getAllCategories()
  }

  handleChange(category) {
    this.props.selectCategory(category)
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        <div>
          <h2>Content and Comment App</h2>
        </div>
        {categories.map((category, index) => (
          <Link key={index} to={category.path}>
            <button
              onClick={ e => this.handleChange(category.name)}>
              {category.name}
            </button>
          </Link>
        ))}
      </div>
    );
  }
}
function mapStatetoProps(state) {
  return {
    categories: state.fetchCategoriesReducer.categories,
    category: state.selectedCategoryReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(getCategories2()),
    selectCategory: (data) => dispatch(selectCategory(data))
  }
}
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(App);
