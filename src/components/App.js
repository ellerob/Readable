import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import { getCategories2, selectCategory } from '../actions/category.action';


class App extends Component {

  componentDidMount() {
    const { categories } = this.props;
    if(categories.length === 0 ) {
      this.props.getAllCategories();
    }
  }

  handleChange(category) {
    this.props.selectCategory(category)
  }

  render() {
    const { categories } = this.props;
    if (!categories || categories.length === 0) {
      return <div>Loading</div>;
    }
    
    return (
      <div>
        <div>
          <h1>Content and Comment App</h1>
        </div>
        <div className="buttons">
          {categories.map((category, index) => {
            return (
            <Link key={index} category={category} to={`category${category.path}`}>
              <button className="category-button"> {category.name} </button>
            </Link>
          )})}
        </div>
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
    selectCategory: (data) => dispatch(selectCategory(data))
  }
}
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(App);
