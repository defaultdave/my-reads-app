import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import _ from 'lodash';

import { ListBooks, SearchBooks, BookDetail } from './components/index'
import './App.css'

class BooksApp extends React.Component {
  constructor () {
    super()
    this.state = {
      books: [],
      result: [],
      showModal: false
    }
  }

  openBookDetail = (book) => {
    this.setState({bookToDetail: book, showModal: true})
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  bookSearch = (term) => {
    BooksAPI.search(term, 20).then(result => {
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
        <BookDetail
          book={this.state.bookToDetail}
          showModal={this.state.showModal}
        />
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
            onOpenBookDetail={this.openBookDetail}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
