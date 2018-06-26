import React from 'react'
import { connect } from 'react-redux';
import { editPost } from '../actions/post.action'
import { editPostCall } from '../utils/api';

class EditPost extends React.Component {
  state = {
    titleNew: '',
    bodyNew: ''
  }

  updateTitle(e) {
    this.setState({ titleNew: e.target.value })
  }

  updateBody(e) {
    this.setState({ bodyNew: e.target.value })
  }

  onSubmit(e) {
    const { bodyNew, titleNew } = this.state
    const { bodyCurrent, titleCurrent } = this.props
    const { id } = this.props
    const timestamp = Date.now()
    let body
    let title
    if (bodyNew.length > 0) {
      body = bodyNew
    } else {
      body = bodyCurrent
    }
    if (titleNew.length > 0) {
      title = titleNew
    } else {
      title = titleCurrent
    }
    const updatedPost = {
      id,
      title,
      body,
      timestamp
    }
    const toServer={ title, body }
    this.props.editPost(updatedPost)
    editPostCall(id, toServer)
  }

  render() {
    const { bodyNew, titleNew } = this.state
    const { bodyCurrent, titleCurrent } = this.props
    return (
      <div className="edit-input">
        <div>
          <p>Edit Title</p>
          <input
            type="text"
            placeholder={titleCurrent}
            onChange={(e) => this.updateTitle(e)}
            value={titleNew} />
        </div>
      <p> Edit Body </p>
        <textarea
          type="text"
          placeholder={bodyCurrent}
          value={bodyNew}
          onChange={(e) => this.updateBody(e)}
        />
        <button
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
    post: state.posts.posts.find(({ id: postId }) => id === postId),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: (updatedPost) => dispatch(editPost(updatedPost)),
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(EditPost)