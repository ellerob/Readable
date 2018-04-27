import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchCategory } from '../utils/api';
import { recievedPostsByCategory } from '../actions/index';


class CategoryPage extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    fetchCategory(id)
      .then(data => this.props.recievedPostsByCategory(data));

    // make api call to cat page
    // using id passed in
    // set to state when comes back
  }

  render() {
    const { category } = this.props
    return (
      <div>
        <div>
          <h1>{this.props.match.params.id}</h1>
        </div>
        <div>
          <Link to="/">
            Home
        </Link>
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    category: state.selectedCategoryReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    recievedPostsByCategory: (data) => dispatch(recievedPostsByCategory(data)),
    getCategory: () => dispatch({ type: null, payload: null})
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(CategoryPage)