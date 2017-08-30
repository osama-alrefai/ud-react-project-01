import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookComponent from './BookComponent';

class BookshelfComponent extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
    }

    moveBook(book, newValue) {
        if (this.props.onMoveBook) {
            this.props.onMoveBook(book, newValue)
        }
    }

    render() {
        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">{ this.props.title }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                        {this.props.books.map((book) => (
                            <BookComponent
                                key={book.id}
                                book={book}
                                shelf={this.props.shelf}
                                onMoveBook={(book, newValue) => this.moveBook(book, newValue)}
                            />
                        ))}
                    </ol>
                </div>
            </div>

        )
    }
}


export default BookshelfComponent;