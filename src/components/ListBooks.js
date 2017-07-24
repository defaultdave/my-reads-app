import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'

import Book from './Book'

class ListBooks extends Component {
  static propTypes = {
    onUpdateBook: Proptypes.func.isRequired,
    onGetAllBooks: Proptypes.func.isRequired,
    onOpenBookDetail: Proptypes.func.isRequired
  }

  componentDidMount() {
    this.props.onGetAllBooks()
  }

  updateBook = (id, shelf) => {
    this.props.onUpdateBook(id, shelf).then(res =>{
      this.props.onGetAllBooks()
    })
  }

  render() {
    const { books, onOpenBookDetail } = this.props
    const shelves = books.reduce((acc, book) => {
      acc[book.shelf].push(book)
      return acc
    }, {wantToRead:[ ], currentlyReading: [], read: []})

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelves.currentlyReading.map((book) => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        onUpdateBook={this.updateBook}
                        onOpenBookDetail={onOpenBookDetail}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelves.wantToRead.map((book) => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        onUpdateBook={this.updateBook}
                        onOpenBookDetail={onOpenBookDetail}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelves.read.map((book) => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        onUpdateBook={this.updateBook}
                        onOpenBookDetail={onOpenBookDetail}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            className='open-search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks