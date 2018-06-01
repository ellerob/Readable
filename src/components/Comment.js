import React from 'react'
import moment from 'moment'


class Comments extends React.Component {
  render() {
    const { body, author, timestamp } = this.props
    return (
      <div>
        <p>{body}</p>
        <p>{`Author: ${author}`}</p>
        <p>{`Time Posted: ${moment(timestamp).format('LLLL')}`}</p>        
      </div>
    )
  }
}

export default Comments
