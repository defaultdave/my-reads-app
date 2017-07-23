import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import _ from 'lodash';

import { ListBooks, SearchBooks } from './components/index'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    result: []
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  bookSearch = (term) => {
    BooksAPI.search(term, 20).then(result => {
      console.log('search res:', result)
      if(result && result.length > 0) {
        this.setState({result})
      } else {
        this.setState({result: []})
      }
    })
  }

  /**
   * @description Update a books shelf, return the promis of the update
   * @param {number} bookID
   * @param {string} shelf
   * @returns {promise} BooksAPI promise after updating
   */
  updateBook = (bookID, shelf) => {
    return BooksAPI.update({id: bookID}, shelf)
  }

  render() {
    const bookSearch = _.debounce((term) => {this.bookSearch(term)}, 300);
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            onUpdateBook={this.updateBook}
            onSearchTermChange={bookSearch}
            result={this.state.result}
          />
        )}/>
        <Route exact path='/' render={({ history }) => (
          <ListBooks
            books={this.state.books}
            onUpdateBook={this.updateBook}
            onGetAllBooks={this.getAllBooks}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
