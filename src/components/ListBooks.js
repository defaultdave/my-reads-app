import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'

import Shelf from './Shelf'

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
      acc[book.shelf].books.push(book)
      return acc
    }, {currentlyReading: {name: 'Currently Reading', books:[]}, wantToRead:{name: 'Want To Read', books:[]}, read: {name: 'Read', books:[]}})
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(shelves).map( (key, index) => (
              <Shelf key={index}
                shelfName={shelves[key].name}
                booksOnShelf={shelves[key].books}
                onUpdateBook={this.updateBook}
                onOpenBookDetail={onOpenBookDetail}
              />
            ))}
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