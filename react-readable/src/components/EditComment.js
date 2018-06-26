import React from 'react'
import { connect } from 'react-redux';
import { editComment } from '../actions/comments.action';
import { editCommentCall } from '../utils/api';

class EditComment extends React.Component {
  state = {
    bodyNew: ''
  }

  updateBody(e) {
    this.setState({ bodyNew: e.target.value })
  }

  onSubmit(e) {
    const { bodyNew } = this.state
    const { bodyCurrent } = this.props
    const { id } = this.props
    let body
    const timestamp = Date.now()
    if (bodyNew.length > 0) {
      body = bodyNew
    } else {
      body = bodyCurrent
    }
    const updatedComment = {
      id,
      body,
      timestamp
    }
    const toServer={ body, timestamp }
    this.props.editComment(updatedComment)
    editCommentCall(id, toServer)
  }

  render() {
    const { bodyNew } = this.state
    const { bodyCurrent } = this.props
    return (
      <div className="edit-input">
      <p> Edit Body </p>
        <textarea
          type="text"
          placeholder={bodyCurrent}
          value={bodyNew}
          onChange={(e) => this.updateBody(e)}
        />
        <button
          className="submit-button"
          type="submit"
          value="submit"
          onClick={(e) => this.onSubmit(e)}
        >Submit
        </button>
      </div>
    )
  }
}

function mapStatetoProps(state, id) {
  return {
    comments: state.comments.comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: (updatedComment) => dispatch(editComment(updatedComment)),
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(EditComment)