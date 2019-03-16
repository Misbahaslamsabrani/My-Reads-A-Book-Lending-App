import React, { Component } from 'react';
import { update, search } from '../BooksAPI';
import Shelf from './Shelf';
import { Link } from "react-router-dom";

class Search extends Component {
    state = {
        SearchedBooks: [],
    }
    whenChange = (event) => {
        const text = event.target.value;
        this.setState({ SearchedBooks: [] })
        if (text.length === 0) {
            this.setState({ SearchedBooks: [] })
        }
        search(text).then(books => {
            if (Array.isArray(books) && books.length > 0) {
                const TemBooks = [...books]
                TemBooks.forEach((v, i) => {
                    var specificBookOfShelf = this.props.allCurrentSelfBooks.find(j => j.id === v.id)
                    if (specificBookOfShelf !== undefined) {
                        TemBooks[i].shelf = specificBookOfShelf.shelf
                    }
                    else { TemBooks[i].shelf = "none" }
                })
                this.setState({ SearchedBooks: TemBooks })
            }
            else {
                this.setState({ SearchedBooks: [] })
            }
        })
    }

    whenSelect = (event, book, index) => {
        const shelf = event.target.value;
        update(book, shelf)
        const TemArr = [...this.state.SearchedBooks];
        TemArr[index].shelf = shelf;
        this.setState({ SearchedBooks: TemArr })
    }
    render() {
        const { SearchedBooks } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.whenChange} />
                    </div>
                </div>
                <Shelf title="Search Results" books={SearchedBooks} whenselected={this.whenSelect} />
            </div>
        );
    }
}
export default Search;