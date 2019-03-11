import React, { Component } from 'react';
/* import * as BooksAPI from './BooksAPI' */
class Search extends Component {
    state = {}
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">

                    {/*------------------------------------------------Back button----------------------- */}
                    <button className="close-search" onClick={() => this.props.history.goBack()}>Close</button>

                    {/*---------------------Input field------------------ */}
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" />
                    </div>
                </div>

                {/*----------------------List of searched books-------------- */}
                <div className="search-books-results">
                    <ol className="books-grid">

                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;