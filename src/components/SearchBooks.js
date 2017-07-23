import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'

import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    onUpdateBook: Proptypes.func.isRequired,
    onSearchTermChange: Proptypes.func.isRequired
  }

  state = {
    term: ''
  }

  onInputChange(term) {
    this.setState({term})
    this.props.onSearchTermChange(term)
  }

  render() {
    const { onUpdateBook, result } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.onInputChange(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {result.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBook={onUpdateBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks