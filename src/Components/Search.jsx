import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI'
class Search extends Component {
    state = {
        SearchedBooks: [],
        AllShelfBooks: [],
    }
    componentDidMount(){
        BooksAPI.getAll().then(data => this.setState({AllShelfBooks: data}))
    }
    whenChange = (event) => {
        const text = event.target.value;
        this.setState({ SearchedBooks: [] })
        if (text.length === 0) {
            this.setState({ SearchedBooks: [] })
        }
        BooksAPI.search(text).then(books => {
            if (Array.isArray(books) && books.length > 0) {
                const TemBooks = [...books]
                    TemBooks.forEach((v, i) => {
                        var specificBookOfShelf = this.state.AllShelfBooks.find(j => j.id === v.id)
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

    whenSelect = (event, book) => {
        const shelf = event.target.value;
        BooksAPI.update(book, shelf)
    }
    render() {
        console.log(this.state.SearchedBooks)
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
                        {this.state.SearchedBooks.length > 0 ? (this.state.SearchedBooks.map(v =>
                            <li key={v.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${v.imageLinks ? (v.imageLinks.thumbnail) : ""})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(e) => this.whenSelect(e, v)} value={v.shelf}>
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