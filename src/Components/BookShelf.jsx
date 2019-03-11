import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
class BookShelf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Read: [],
            CurrentlyRead: [],
            WantToRead: [],
        };
    }
    componentDidMount() {
         this.getData()
    }
    getData = () => {
        BooksAPI.getAll().then(data => {
            console.log(data)
            const CurrentlyRead = data.filter(v => v.shelf === "currentlyReading")
            const Read = data.filter(v => v.shelf === "read")
            const WantToRead = data.filter(v => v.shelf === "wantToRead")
            this.setState({ CurrentlyRead, Read, WantToRead })
        })
    }
    whenSelect = (event, book) => {
        const shelf = event.target.value;
        BooksAPI.update(book, shelf).then(data => {
            this.getData()
        })
    }
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {/* -----------------Currently reading ----------------------------------------------------- */}
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.CurrentlyRead.length > 0 ? (this.state.CurrentlyRead.map(v => <li key={v.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${v.imageLinks.thumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={(e) => this.whenSelect(e, v)} defaultValue={v.shelf}>
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
                                    </li>)) : (<li> No Books Found </li>)}
                                </ol>
                            </div>
                        </div>

                        {/* ----------------------------------WANT TO READ----------------------------------------------------------*/}

                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.WantToRead.length > 0 ? (this.state.WantToRead.map(v => <li key={v.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${v.imageLinks.thumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={(e) => this.whenSelect(e, v)} defaultValue={v.shelf}>
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
                                    </li>)) : (<li> No Books Found </li>)}
                                </ol>
                            </div>
                        </div>

                        {/* ------------------------------READ---------------------------------------------------------------- */}

                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.Read.length > 0 ? (this.state.Read.map(v => <li key={v.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${v.imageLinks.thumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={(e) => this.whenSelect(e, v)} defaultValue={v.shelf}>
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
                                    </li>)) : (<li> No Books Found </li>)}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                {/*-----------------------------------------------------SEARCH BUTTON/ADD BUTTON------------------------------ */}

                <div className="open-search">
                    <button onClick={() => this.props.history.push("/Search")}>Add a book</button>
                </div>
            </div>
        );
    }
}

export default BookShelf;