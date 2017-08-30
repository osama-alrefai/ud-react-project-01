import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookComponent from './BookComponent'
import * as BooksAPI from '../BooksAPI'
import serializeForm from 'form-serialize'
import escapeRegExp from 'escape-string-regexp';


class SearchComponent extends Component {

    state = {
        q: '',
        books: [],
    }

    moveBook(book, newValue) {
        // Update parent
        if (this.props.onMoveBook) {
            this.props.onMoveBook(book, newValue)
        }
    }
    searchBook(q) {
        BooksAPI.search(q).then(books => {
            this.setState({books})
        })
    }

    handleSearch = (e) => {

        const values = serializeForm(e.target.form, { hash: true })
        let q;
        if (values.q) {
            q = escapeRegExp(values.q); //e.target.value.trim()
        } else {
            q = ''
        }

        this.setState({ q: q })
        this.searchBook(q)
    }

    render() {

        return (

            <div>

                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                            <form onSubmit={this.handleSubmit}>
                                <input onChange={this.handleSearch}
                                       type="text"
                                       name="q"
                                       value={this.state.q}
                                       placeholder="Search by title or author"/>
                            </form>

                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.books && (this.state.books.map((book) => (
                                <BookComponent
                                    key={book.id}
                                    book={book}
                                    shelf={this.getBookShelf(book)}
                                    onMoveBook={(book, newValue) => this.moveBook(book, newValue)}/>
                            )))}
                        </ol>
                    </div>
                </div>
            </div>

        )
    }

    getBookShelf(book) {

        let shelf = '';
        this.props.myBooks.map((b) => {
            if (b.id === book.id) {
                shelf = b.shelf
            }
        })

        return shelf;

    }
}

export default SearchComponent;