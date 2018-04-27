import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import { getCategories2, selectCategory } from '../actions';


class App extends Component {

  componentDidMount() {
    const { categories } = this.props;
    console.log(categories);
    
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
          <h2>Content and Comment App</h2>
        </div>
        {categories.map((category, index) => {
          return (
          <Link key={index} category={category} to={`category${category.path}`}>
            <button> {category.name} </button>
          </Link>
        )})}
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
