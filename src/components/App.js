import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import { getCategories2 } from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.getAllCategories()
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
            <button>
              {category.name}
            </button>
          </Link>
        ))}
      </div>
    );
  }
}
function mapStatetoProps (state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () => dispatch(getCategories2())
  }
}
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(App);
