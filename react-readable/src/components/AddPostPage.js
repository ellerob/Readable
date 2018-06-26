import React from 'react'
import { connect } from 'react-redux';
import './App.css'
import uuid from 'uuid'
import { getCategories2 } from '../actions/category.action'
import { createPost } from '../actions/post.action'
import { postPost } from '../utils/api';

class AddPostPage extends React.Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    errorMessage: '',
  }

  componentDidMount() {
    const { categories } = this.props;
    if (categories.length === 0) {
      this.props.getAllCategories();
    }
  }

  updateTitle(e) {
    this.setState({ title: e.target.value })
  }

  updateCategory(e) {
    this.setState({ category: e.target.value })
  }

  updateBody(e) {
    this.setState({ body: e.target.value })
  }

  updateAuthor(e) {
    this.setState({ author: e.target.value })
  }

  onSubmit() {
    const { title, category, body, author } = this.state;
    const { history } = this.props;
    if (title && category && body && author) {
      const newPost = {
        id: uuid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category: category.toLowerCase(),
        voteScore: 0,
      }

      this.setState({ errorMessage: '' })
      this.props.addPost(newPost)
      postPost(newPost)
        .then(history.push('/'))

    } else {
      this.setState({ errorMessage: 'Please fill out all fields' })
    }

  }

  render() {

    const { title, body, author, errorMessage } = this.state
    const { categories } = this.props;

    return (
      <div>
        <h1>Add a post</h1>
        <div className="add-field">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => this.updateTitle(e)}
            value={title} />
        </div>
        <div className="add-field">
          <label>Category</label>
          <select
            placeholder="Category"
            defaultValue='none'
            onChange={(e) => this.updateCategory(e)}>
            <option value="none" disabled>Choose a category</option>
            {categories.map(category => (
              <option
                key={category.name}
                value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="add-field">
          <label>Body</label>
          <textarea
            type="text"
            placeholder="Post"
            value={body}
            onChange={(e) => this.updateBody(e)}
          />
        </div>
        <div className="add-field">
          <label>Author</label>
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => this.updateAuthor(e)}
          />
        </div>
        <button
          className="submit-button"
          type="submit"
          value="submit"
          onClick={(e) => this.onSubmit(e)}
        >Submit
        </button>
        <p>{errorMessage}</p>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    categories: state.categories.categories,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(getCategories2()),
    addPost: (newPost) => dispatch(createPost(newPost))
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(AddPostPage);

