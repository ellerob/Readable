import React from 'react'
import './App.css'
import moment from 'moment'
import uuidv4 from 'uuid/v4'

class AddPostPage extends React.Component {

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
  
  render() {
    state: {
      title: ''
      body: ''
      author: ''
      category: ''
    }

    // const newPost = {
    //   id: uuidv4(),
    //   timestamp: moment(),
    //   title,
    //   body,
    //   author,
    //   category,
    // }

  
  return(
    <div>
      <h1>Add a post</h1>
      <form>
        <div className="add-field">
          <label>Title</label>
          <input
            type="text"
            onChange={(event) => this.updateTitle(event.target.value)}
            />
        </div>
        <div className="add-field">
          <label>Category</label>
          <input
            type="text"
            onChange={(event) => this.updateCategory(event.target.value)}
            />
        </div>
        <div className="add-field">
          <label>Body</label>
          <textarea
            type="text"
            onChange={(event) => this.updateBody(event.target.value)}
            />
        </div>
        <div className="add-field">
          <label>Author</label>
          <input
            type="text"
            onChange={(event) => this.updateAuthor(event.target.value)}
            />
        </div>
        <button
          type="submit"
          value="submit"
          >Submit
        </button>
      </form>
    </div>
  )
}

}

export default AddPostPage;