import React from 'react';

const Shelf = (props) => {
    const { books, title, whenselected } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.length > 0 ? (books.map((v,i) => <li key={v.id}>
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${v.imageLinks ? (v.imageLinks.thumbnail) : ""})` }}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(e) => whenselected(e, v, i)} defaultValue={v.shelf}>
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
    );
}

export default Shelf;