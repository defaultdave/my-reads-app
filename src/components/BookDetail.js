import React, { Component } from 'react'
import ReactModal from 'react-modal'
import Proptypes from 'prop-types'

class BookDetail extends Component {
  static propTypes = {
    book: Proptypes.object,
    clearBook: Proptypes.func
  }
  constructor () {
    super()
    this.state = {
      book: null,
      showModal: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.book) {
      this.setState({book: nextProps.book, showModal: true})
    }
  }

  handleOpenModal () {
    this.setState({ showModal: true })
  }

  handleCloseModal () {
    this.setState({book: null, showModal: false })
    this.props.clearBook()
  }

  render(){
    const { book, showModal } = this.state
    return (
        <ReactModal
           isOpen={showModal}
           contentLabel="Minimal Modal Example"
        >
          {book ?
            <div className="modal-details">
              <div className="book-title modal-text">Title: {book.title}</div>

              <div className="book-authors modal-text">Authors:</div>
              {book.authors.map((name) => (
                <div className="book-authors modal-text" key={name}>{name}</div>
              ))}

              <div className="book-publisher modal-text">Publisher: {book.publisher}</div>
              <div
                className="book-cover"
                style={{ height: 200 , backgroundImage: `url(${book.imageLinks.thumbnail})` }}
              ></div>
            </div>
            : null
          }
          <div className="modal-close" type='submit' onClick={this.handleCloseModal} value=''></div>
        </ReactModal>
    )
  }
}

export default BookDetail