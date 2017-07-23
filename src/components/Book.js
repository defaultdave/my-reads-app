import React, { Component } from 'react'
import Proptypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    onUpdateBook: Proptypes.func.isRequired,
    book: Proptypes.object.isRequired
  }

  componentWillMount() {
    console.log('My books', this.props.book)
  }

  updateBookShelf = (shelf) => {
    console.log('Shelf changed', shelf)
    const { book, onUpdateBook } = this.props
    onUpdateBook(book.id, shelf)
  }

  render() {
    const { book } = this.props
    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks ?
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            : null
          }
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf}
              onChange={(event) => this.updateBookShelf(event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book