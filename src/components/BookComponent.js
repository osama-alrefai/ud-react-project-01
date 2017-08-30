import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChangerComponent from './ChangerComponent';
import * as BooksAPI from '../BooksAPI'

class BookComponent extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
    }

    moveBook(newValue) {
        this.props.book.shelf = newValue

        // Update backend
        BooksAPI.update(this.props.book, newValue);

        if (this.props.onMoveBook) {
            this.props.onMoveBook(this.props.book, newValue)
        }
    }

    render() {
        return (

            <li key={this.props.book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <ChangerComponent
                                selectedOption={this.props.shelf}
                                onMoveBook={(newValue) => this.moveBook(newValue)}
                            />
                        </div>
                    </div>
                    <div className="book-title">{ this.props.book.title }</div>
                    { this.props.book.authors && (
                        <div className="book-authors">{ this.props.book.authors.map((author, index) => (
                            <span key={index}>{ author }<br /></span>
                        )) }</div>
                    )}
                </div>
            </li>

        )
    }
}


export default BookComponent;