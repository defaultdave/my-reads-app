import React, { Component } from 'react'
import ReactModal from 'react-modal';

class BookDetail extends Component {
  constructor () {
    super()
    this.state = {
      book: null,
      showModal: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showModal: nextProps.showModal})
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render(){
    const { book } = this.props
    return (
        <ReactModal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          {book ?
            <div>
              <div className="book-title">Title: {book.title}</div>

              <div className="book-authors">Authors:</div>
              {book.authors.map((name) => (
                <div className="book-authors" key={name}>{name}</div>
              ))}

              <div className="book-publisher">Publisher: {book.publisher}</div>
              <div
                className="book-cover"
                style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
              ></div>
            </div>
            : null
          }
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
    )
  }
}

export default BookDetail