import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI'
class Search extends Component {
    state = {
        text: "",
        SearchedBooks: []
    }
    whenChange = (event) => {
        const text = event.target.value;
        if (text.length === 0) {
            this.setState({ text: "", SearchedBooks: [] })
        }
        BooksAPI.search(text).then(books => {
            console.log(books)
            if (Array.isArray(books)) {
                this.setState({ SearchedBooks: books })
            }
        })
    }
    whenSelect = (event, book, index) => {
        console.log(event.target.value, book, index)
        const shelf = event.target.value;
        BooksAPI.update(book, shelf).then(data => console.log(data)).catch(err => console.log(err))
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">

                    {/*------------------------------------------------Back button----------------------- */}
                    <button className="close-search" onClick={() => this.props.history.goBack()}>Close</button>

                    {/*---------------------Input field------------------ */}
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.whenChange} />
                    </div>
                </div>
                {/*----------------------List of searched books-------------- */}
                <div className="search-books-results">
                    <h2 className="bookshelf-title">Search Results</h2>
                    <ol className="books-grid">
                        {this.state.SearchedBooks.length > 0 ? (this.state.SearchedBooks.map((v,i) => <li key={v.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${v.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select onChange={(e) => this.whenSelect(e, v, i)} defaultValue={v.shelf ? (v.shelf) : "move"}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{v.title}</div>
                                <div className="book-authors">{Array.isArray(v.authors) ? (v.authors.join(", ")) : ("")}</div>
                            </div>
                        </li>)) : (<li>No Books Found</li>)}
                    </ol>
                </div>
            </div>
        );
    }
}
export default Search;
/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */