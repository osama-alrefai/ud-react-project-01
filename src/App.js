import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import './App.css'
import SearchComponent from './components/SearchComponent';
import BookshelfComponent from './components/BookshelfComponent';

class BooksApp extends React.Component {

    state = {
        books: [],
    }

    moveBook(book, newValue) {
        let bookFound = false

        const books = this.state.books.map((b) => {
            if (b.id === book.id) {
                b.shelf = newValue
                bookFound = true
            }

            return b
        })

        if (!bookFound) {
            // Add this new book
            this.setState(state => ({
                books: state.books.concat([ book])
            }))
        }
        else {
            this.setState({ books });
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books} );
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (

                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>

                        <div className="list-books-content">
                            <div>

                                <BookshelfComponent
                                    title="Currently Reading"
                                    shelf='currentlyReading'
                                    books={this.state.books.filter((book) => {
                                        return book.shelf === 'currentlyReading'
                                    })}
                                    onMoveBook={(book, newValue) => this.moveBook(book, newValue)}
                                />

                                <BookshelfComponent
                                    title="Want to Read"
                                    shelf='wantToRead'
                                    books={this.state.books.filter((book) => {
                                        return book.shelf === 'wantToRead'
                                    })}
                                    onMoveBook={(book, newValue) => this.moveBook(book, newValue)}
                                />

                                <BookshelfComponent
                                    title="Read"
                                    shelf='read'
                                    books={this.state.books.filter((book) => {
                                        return book.shelf === 'read'
                                    })}
                                    onMoveBook={(book, newValue) => this.moveBook(book, newValue)}
                                />

                            </div>
                        </div>

                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>



                )}></Route>

                <Route path="/search" render={() => (

                    <SearchComponent
                        myBooks={this.state.books}
                        onSearch={(q) => {
                            this.searchBook(q)
                        }}
                        onMoveBook={(book, newValue) => this.moveBook(book, newValue)}
                    />

                )}>
                </Route>
            </div>
        )
    }
}

export default BooksApp
