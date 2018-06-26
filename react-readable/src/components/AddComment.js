import React from 'react'
import './App.css'
import uuid from 'uuid'
import { connect } from 'react-redux';
import { createComment } from '../actions/comments.action'
import { postComment } from '../utils/api';

class AddComment extends React.Component {
  state = {
    body: '',
    author: '',
    errorMessage: '',
  }

  updateBody(e) {
    this.setState({ body: e.target.value })
  }

  updateAuthor(e) {
    this.setState({ author: e.target.value })
  }

  onSubmit() {
    const { body, author } = this.state;
    const { parentId } = this.props;
    if (body && author) {
      const newComment = {
        id: uuid(),
        parentId,
        timestamp: Date.now(),
        body,
        author,
        voteScore: 0,
      }

      this.setState({ errorMessage: '' }) 
      this.props.addComment(newComment)
      postComment(newComment)
    } else {
      this.setState({ errorMessage: 'Please fill out all fields' })
    }
  }

  render() {

    const { body, author, errorMessage } = this.state

    return (
      <div>
        <div className="add-field">
          <label>Body</label>
          <textarea
            type="text"
            placeholder="Comment"
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
        >Submit Comment
        </button>
        <p>{errorMessage}</p>
      </div>
    )
  }
}
function mapStatetoProps(state) {
  return {
    comments: state.comments.comments,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addComment: (newComment) => dispatch(createComment(newComment))
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(AddComment);
