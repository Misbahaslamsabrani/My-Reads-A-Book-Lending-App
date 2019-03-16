import React from 'react';
import Shelf from './Shelf';
import { Link } from "react-router-dom";

const BookShelf = (props) => {
    const { CurrentlyRead, WantToRead, Read, whenSelect } = props;
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Shelf books={CurrentlyRead} title="Currently Reading" whenselected={whenSelect} />
                    <Shelf books={WantToRead} title="Want To Read" whenselected={whenSelect} />
                    <Shelf books={Read} title="Read" whenselected={whenSelect} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/Search" >
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    );
}

export default BookShelf;