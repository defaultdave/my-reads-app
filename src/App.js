import React from 'react'
import { Route } from 'react-router-dom'
import { ListBooks, SearchBooks } from './components/index'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBook = (bookID, shelf) => {
    BooksAPI.update({id: bookID}, shelf).then((res) => {
      this.getAllBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            onUpdateBook={this.updateBook}
          />
        )}/>
        <Route exact path='/' render={({ history }) => (
          <ListBooks
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
