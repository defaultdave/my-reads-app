import React, { Component } from 'react'
import Proptypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
  static propTypes = {
    shelfName: Proptypes.string,
    onUpdateBook: Proptypes.func.isRequired,
    onOpenBookDetail: Proptypes.func.isRequired,
    booksOnShelf: Proptypes.array
  }

  constructor () {
    super()
    this.state = {
      books: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.booksOnShelf) {
      this.setState({books: nextProps.booksOnShelf})
    }
  }

  render() {
    const { shelfName, onUpdateBook, onOpenBookDetail } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBook={onUpdateBook}
                  onOpenBookDetail={onOpenBookDetail}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf